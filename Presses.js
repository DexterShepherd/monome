const { observable, action, computed, reaction, autorun } = require('mobx')
const state = require('./store')

class Presses {
  @observable start
  @observable length
  @observable toggles
  @observable render
  @observable brightness
  @observable active

  constructor(start, length, brightness, render) {
    this.start = start
    this.length = length
    this.render = render
    this.brightness = brightness
    this.active = true

    this.toggles = Array(this.length)
      .fill()
      .map(_ => 0)

    this.lastPresses = []

    autorun(() => this.updateLights())
    reaction(
      () => state.presses,
      () => this.updateToggles()
    )
  }

  updateLights() {
    if (this.active) {
      if (this.render == 'toggles') {
        this.toggles.forEach((v, i) => {
          state.grid[i + this.start] = v ? this.brightness : 0
        })
      }
      if (this.render == 'presses') {
        this.presses.forEach((v, i) => {
          state.grid[i + this.start] = v ? this.brightness : 0
        })
      }
    }
  }

  updateToggles() {
    if (this.active) {
      this.toggles = this.toggles.map((v, i) => {
        const index = i + this.start
        if (state.presses.includes(index) !== this.lastPresses.includes(index)) {
          return state.presses.includes(i + this.start) ? Number(!v) : Number(v)
        }
        return Number(v)
      })

      this.lastPresses = state.presses
    }
  }

  @computed
  get presses() {
    return Array(this.length)
      .fill()
      .map((_, i) => {
        if (state.presses.includes(i + this.start)) {
          return 1
        }
        return 0
      })
  }

  set toggles(toggles) {
    this.toggles = toggles
    this.lastPresses = []
  }
}

module.exports = Presses
