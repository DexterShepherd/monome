const { observable, observe, autorun, computed, reaction } = require('mobx')
const state = require('./store')
const midi = require('./Midi')
const { set } = require('./Actions')
const Presses = require('./Presses')
const BinaryNumberInput = require('./BinaryNumberInput')
const PatternChainer = require('./PatternChainer')

class Sequencer {
  @observable start
  @observable length
  @observable patterns

  constructor(start, length) {
    this.start = start
    this.length = length

    this.stepBrightness = 7
    this.playheadBrightness = 3

    this.note = new BinaryNumberInput(this.start, 8, 36)

    this.patternChainer = new PatternChainer(this.start + 8, 8)

    this.seqOffset = 16
    this.patterns = Array(8)
      .fill()
      .map(_ => new Presses(this.start + this.seqOffset, this.length, this.stepBrightness, 'toggles'))
    this.patterns.forEach((v, i) => (v.active = i == 0))

    // this.presses = new Presses(this.start + this.seqOffset, this.length, this.stepBrightness, 'toggles')

    reaction(
      () => state.pos,
      () => this.tick()
    )

    reaction(
      () => this.patternChainer.editStep,
      step => {
        this.patterns.forEach((v, i) => (v.active = i == step))
      }
    )

    autorun(() => {
      console.log('playback', this.patternChainer.playbackStep)
      console.log('edit', this.patternChainer.editStep)
    })

    // reaction(() => this.patternChainer.steps)
  }

  tick() {
    set(this.start + this.seqOffset + this.lastPos, this.editPresses.toggles[this.lastPos] && this.stepBrightness)
    set(this.start + this.seqOffset + this.pos, this.playheadBrightness)

    if (this.playbackPresses.toggles[this.pos]) {
      midi.on(this.note.value, 127, 1, 100)
    }
  }

  @computed
  get pos() {
    return state.pos % this.length
  }

  @computed
  get lastPos() {
    return (this.pos - 1 + this.length) % this.length
  }

  @computed
  get editPresses() {
    return this.patterns[this.patternChainer.editStep]
  }
  get playbackPresses() {
    return this.patterns[this.patternChainer.playbackStep]
  }
}

module.exports = Sequencer
