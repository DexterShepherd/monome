const { onTick } = require('../Transport')
const { set } = require('../Grid')
const { bus, subscribe } = require('../EventBus')
const { output, send } = require('../Midi')

class Sequencer {
  constructor(startRow, rowCount) {
    this.rowCount = rowCount
    this.startRow = startRow
    this.steps = rowCount * 8
    this.isFocused = false

    this.pattern = Array(this.steps)
      .fill()
      .map(_ => 0)

    this.inputPattern = this.pattern.slice()

    bus.on('key', ({ x, y, s }) => {
      if (this.isFocused) {
        if (y >= this.startRow && y < this.startRow + this.rowCount) {
          if (s == 1) {
            const index = x + (y - this.startRow) * 8
            this.pattern[index] = Number(!this.pattern[index])
            this.inputPattern[index] = this.pattern[index]
            set(x, y, this.pattern[index])
          }
        }
      }
    })

    this.lastTickPos = null

    onTick(tick => {
      const pos = tick % this.steps
      const x = tick % 8
      const y = this.startRow + Math.floor(pos / 8)

      if (this.isFocused) {
        if (this.lastTickPos !== null) {
          set(
            this.lastTickPos.x,
            this.lastTickPos.y,
            this.pattern[this.gridToPattern(this.lastTickPos.x, this.lastTickPos.y)]
          )
        }
        set(x, this.startRow + Math.floor(pos / 8), 1)
      }
      if (this.pattern[pos] == 1) {
        send({ note: this.trackIndex + 36, channel: 1, velocity: 127 }, 100)
      }
      this.lastTickPos = { x, y }
    })
  }
  patternToGrid(index) {
    const x = index % 8
    const y = Math.floor(index / 8) + this.startRow
    return { x, y }
  }
  gridToPattern(x, y) {
    return x + (y - this.startRow) * 8
  }
  writePatternToGrid() {
    this.pattern.forEach((val, i) => {
      const { x, y } = this.patternToGrid(i)
      set(x, y, val)
    })
  }
  addPattern(pattern) {
    this.pattern = this.inputPattern.map((val, i) => Math.max(val, pattern[i]))
    this.writePatternToGrid()
  }

  addSubscription(instance) {
    subscribe(instance, 'pattern', pattern => {
      this.addPattern(pattern)
    })
  }
  addTrack(instance) {
    this.trackIndex = instance.index
    subscribe(instance, 'track', ({ focus }) => {
      this.writePatternToGrid()
      this.isFocused = focus
    })
  }
}

module.exports = Sequencer
