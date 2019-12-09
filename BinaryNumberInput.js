const { observable, computed } = require('mobx')
const Presses = require('./Presses')

class BinaryNumberInput {
  @observable start
  @observable length

  constructor(start, length, initial) {
    this.start = start
    this.length = length
    this.presses = new Presses(this.start, this.length, 5, 'toggles')

    if (initial) {
      if (initial >= 2 ** this.length) {
        return console.error(`cannot set value ${initial} in ${this.length} bits`)
      }
      const toggles = [
        ...initial
          .toString(2)
          .split('')
          .reverse()
          .map(v => parseInt(v)),
        ...Array(this.length)
          .fill()
          .map(_ => 0)
      ].slice(0, this.length)

      this.presses.toggles = toggles
    }
  }

  @computed
  get value() {
    return parseInt(
      this.presses.toggles
        .slice()
        .reverse()
        .join(''),
      2
    )
  }
}

module.exports = BinaryNumberInput
