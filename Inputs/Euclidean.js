const { onTick } = require('../Transport')
const { set } = require('../Grid')
const { bus, subscribe } = require('../EventBus')
const euclid = require('euclidean-rhythms')
const uuid = require('uuid/v1')
const rotate = require('rotate-array')

class Euclidean {
  constructor(row) {
    this.row = row
    this.steps = 16
    this.id = uuid()
    this.pulseBytes = Array(4)
      .fill()
      .map(_ => 0)
    this.shiftBytes = Array(4)
      .fill()
      .map(_ => 0)

    this.isFocused = false

    bus.on('key', ({ x, y, s }) => {
      if (this.isFocused) {
        if (y == this.row && s == 1) {
          if (x < 4) {
            this.pulseBytes[x] = Number(!this.pulseBytes[x])
            set(x, y, this.pulseBytes[x])
            bus.emit(`${this.id}-pattern`, this.pattern)
          } else {
            this.shiftBytes[x - 4] = Number(!this.shiftBytes[x - 4])
            set(x, y, this.shiftBytes[x - 4])
            bus.emit(`${this.id}-pattern`, this.pattern)
          }
        }
      }
    })
  }

  get pulses() {
    return parseInt(
      this.pulseBytes
        .slice()
        .reverse()
        .join(''),
      2
    )
  }

  get shift() {
    return parseInt(
      this.shiftBytes
        .slice()
        .reverse()
        .join(''),
      2
    )
  }

  get pattern() {
    const pattern = euclid.getPattern(this.pulses, this.steps)
    rotate(pattern, this.shift * -1)
    return pattern
  }

  writePatternToGrid() {
    this.pulseBytes.forEach((val, i) => {
      set(i, this.row, val)
    })
    this.shiftBytes.forEach((val, i) => {
      set(i + 4, this.row, val)
    })
  }

  addTrack(instance) {
    subscribe(instance, 'track', ({ focus }) => {
      this.writePatternToGrid()
      this.isFocused = focus
    })
  }
}

module.exports = Euclidean
