const { set } = require('../Grid')
const { bus } = require('../EventBus')
const Sequencer = require('./Sequencer')
const Euclidean = require('./Euclidean')
const uuid = require('uuid/v1')
const { onTick, tickRate } = require('../Transport')

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

    this.stage = 0
    this.stageCount = 1

    this.isHoldingFirstStep = false

    bus.on('tick', tick => {
      if (this.isFocused) {
        set(this.stage, 12, tick % 2 == 0)
      }

      if (tick % 16 == 0) {
        setTimeout(() => tickRate)
        this.stage = (this.stage + 1) % this.stageCount

        bus.emit(`${this.id}-stageUpdate`, { stageCount: this.stageCount, stage: this.stage })
      }
    })

    bus.on('key', ({ x, y, s }) => {
      if (this.isFocused) {
        if (y == 12) {
          if (x == 0) {
            this.isHoldingFirstStep = s
          }

          if (s == 1 && x !== 0) {
            if (this.isHoldingFirstStep) {
              this.stageCount = x + 1
              bus.emit(`${this.id}-stageUpdate`, { stageCount: this.stageCount, stage: this.stage })
              this.lightStages()
            }
          }

          if (s == 1) {
            if (x < this.stageCount) {
              bus.emit(`${this.id}-stageUpdate`, { stageCount: this.stageCount, stage: this.stage, focusStage: x })
            }
          }
        }
      }
    })

    this.lightStages()
  }

  lightStages() {
    for (let i = 0; i < 8; i++) {
      set(i, 12, i < this.stageCount)
    }
  }

  focus() {
    this.isFocused = true
    this.lightStages()
    bus.emit(`${this.id}-track`, { focus: this.isFocused })
  }

  blur() {
    this.isFocused = false
    bus.emit(`${this.id}-track`, { focus: this.isFocused })
  }
}

module.exports = Track
