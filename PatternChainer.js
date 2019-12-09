const { observable, autorun, reaction } = require('mobx')
const state = require('./store')
const Presses = require('./Presses')

class PatternChainer {
  @observable length
  @observable start
  @observable steps
  @observable step
  @observable playbackStep
  @observable editStep
  @observable mode

  constructor(start, length) {
    this.start = start
    this.length = length
    this.steps = 1
    this.step = 0
    this.editStep = 0
    this.playbackStep = 0
    this.presses = new Presses(start, length)
    this.mode = 'neutral'

    autorun(() => this.updateLights())
    reaction(
      () => [this.presses.presses.slice(0, this.length - 1), this.presses.presses[this.length - 1]],
      data => this.onPress(data)
    )

    autorun(() => console.log('mode', this.mode))
  }

  onPress([presses, control]) {
    console.log(control)
    if (control) {
      if (this.mode !== 'editToggle') {
        this.mode = 'editToggle'
      } else {
        this.mode = 'neutral'
      }
    }

    if (this.mode == 'neutral') {
      if (presses.includes(1) && !control) {
        this.editStep = presses.findIndex(v => v == 1)
      }
    }
    if (this.mode == 'editToggle') {
      if (presses.includes(1) && !control) {
        this.playbackStep = presses.findIndex(v => v == 1)
        this.mode = 'neutral'
      }
    }
    if (this.mode == 'chain') {
      // do chaining
    }
  }

  updateLights() {
    this.presses.presses.forEach((_, i) => {
      if (i == this.playbackStep) {
        state.grid[this.start + i] = 3
      } else if (i == this.editStep) {
        state.grid[this.start + i] = 5
      } else {
        state.grid[this.start + i] = 0
      }
    })
    if (this.mode == 'editToggle') {
      state.grid[this.start + this.length - 1] = 5
    }
  }
}

module.exports = PatternChainer
