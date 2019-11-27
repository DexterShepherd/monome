const Grid = require('./Grid')
const Transport = require('./Transport')

const { set } = require('./Grid')
const { bus, subscribe } = require('./EventBus')
const Track = require('./Inputs/Track')

class TrackManager {
  constructor(row, rowCount) {
    this.startRow = row
    this.rowCount = rowCount
    this.tracks = []
    this.focusedTrack = null

    bus.on('key', ({ x, y, s }) => {
      if (y >= this.startRow && y < this.startRow + this.rowCount) {
        if (s == 1) {
          this.setFocus(this.gridToIndex(x, y))
        }
      }
    })
  }

  addTrack(track) {
    this.tracks.push(track)
  }

  setFocus(index) {
    if (this.focusedTrack !== null) {
      this.tracks[this.focusedTrack].blur()
      const { x, y } = this.indexToGrid(this.focusedTrack)
      set(x, y, 0)
    }
    this.tracks[index].focus()
    this.focusedTrack = index
    const { x, y } = this.indexToGrid(index)
    set(x, y, 1)
  }

  indexToGrid(index) {
    const x = index % 8
    const y = Math.floor(index / 8) + this.startRow
    return { x, y }
  }
  gridToIndex(x, y) {
    return x + (y - this.startRow) * 8
  }
}

const manager = new TrackManager(0, 2)
Array(16)
  .fill()
  .map((_, i) => manager.addTrack(new Track(i)))

manager.setFocus(0)
