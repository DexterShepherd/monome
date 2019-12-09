const { observable, autorun, computed, reaction } = require('mobx')
const state = require('./store')
const midi = require('./Midi')
const { set } = require('./Actions')

class Fourths {
  @observable start
  @observable length
  @observable offset
  @observable key

  constructor(start, length) {
    this.start = start
    this.length = length
    this.offset = 32
    this.majorkey = [0, 2, 4, 5, 7, 9, 11]
    this.minorkey = [0, 2, 3, 5, 7, 8, 10]

    this.key = this.minorkey

    state.monome.on('key', ({ x, y, s }) => {
      const note = (16 - y) * 5 + x + this.offset
      if (s) {
        midi.on(note, 127, 1)
      } else {
        midi.off(note, 1)
      }
    })

    this.updateLights()

    reaction(() => [this.key, state.presses], this.updateLights)
  }

  updateLights(data, reaction) {
    if (!data) {
      return
    }
    const [key, presses] = data
    const pressNotes = presses.map(press => {
      const x = press % 8
      const y = Math.floor(press / 8)
      const note = ((16 - y) * 5 + x) % 12
      return note
    })
    state.grid = state.grid.map((_, i) => {
      const x = i % 8
      const y = Math.floor(i / 8)
      const note = ((16 - y) * 5 + x) % 12
      if (pressNotes.includes(note)) {
        return 8
      }
      if (note == 0) {
        return 4
      }
      return key.includes(note) ? 2 : 0
    })
  }
}

module.exports = Fourths
