const { set } = require('../Grid')
const { bus } = require('../EventBus')
const Sequencer = require('./Sequencer')
const Euclidean = require('./Euclidean')
const uuid = require('uuid/v1')

class Track {
  constructor(index) {
    this.index = index
    this.isFocused = false
    this.id = uuid()
    this.euclidean = new Euclidean(13)
    this.seq = new Sequencer(14, 2)
    this.seq.addSubscription(this.euclidean)
    this.seq.addTrack(this)
    this.euclidean.addTrack(this)
  }

  focus() {
    this.isFocused = true
    bus.emit(`${this.id}-track`, { focus: this.isFocused })
  }

  blur() {
    this.isFocused = false
    bus.emit(`${this.id}-track`, { focus: this.isFocused })
  }
}

module.exports = Track
