const { onTick } = require('../Transport')
const { set } = require('../Grid')
const { bus, subscribe } = require('../EventBus')
const { output, send } = require('../Midi')
const { cloneDeep } = require('lodash')

class Sequencer {
  constructor(startRow, rowCount) {
    this.rowCount = rowCount
    this.startRow = startRow
    this.steps = rowCount * 8
    this.isFocused = false
    this.stage = 0
    this.stageCount = 1
    this.focusStage = 0
    this.euclidPattern = []

    this.pattern = Array(this.steps)
      .fill()
      .map(_ => ({
        val: 0
      }))

    this.inputPattern = cloneDeep(this.pattern)

    bus.on('key', ({ x, y, s }) => {
      if (this.isFocused) {
        if (y >= this.startRow && y < this.startRow + this.rowCount) {
          if (s == 1) {
            const index = this.gridToPattern(x, y)
            console.log(index)
            this.pattern[index].val = Number(!this.pattern[index].val)
            this.inputPattern[index].val = this.pattern[index].val
            set(x, y, this.pattern[index].val)
          }
        }
      }
    })

    this.lastTickPos = null

    bus.on('tick', tick => {
      setTimeout(() => {
        const pos = (tick % this.steps) + this.stage * this.steps
        const { x, y } = this.patternToGrid(pos)

        if (this.isFocused && this.focusStage == this.stage) {
          if (this.lastTickPos !== null) {
            set(
              this.lastTickPos.x,
              this.lastTickPos.y,
              this.pattern[this.gridToPattern(this.lastTickPos.x, this.lastTickPos.y)].val
            )
          }
          set(x, this.startRow + Math.floor((pos % 16) / 8), 1)
        }
        if (this.pattern[pos].val == 1) {
          send({ note: this.trackIndex + 36, channel: 1, velocity: 127 }, 100)
        }
        this.lastTickPos = { x, y }
      }, 5)
    })
  }
  patternToGrid(index) {
    const x = index % 8
    const y = Math.floor((index % 16) / 8) + this.startRow
    return { x, y }
  }
  gridToPattern(x, y) {
    return (x % 8) + (y - this.startRow) * 8 + this.steps * this.focusStage
  }
  writePatternToGrid() {
    cloneDeep(this.pattern)
      .slice(this.focusStage * this.steps, (this.focusStage + 1) * this.steps)
      .forEach(({ val }, i) => {
        const { x, y } = this.patternToGrid(i)
        set(x, y, val)
      })
  }

  addPattern(pattern) {
    // this.pattern = this.inputPattern.map(({ val }, i) => ({
    //   val: Math.max(val, pattern[i % 16])
    //   fromEuclid: true
    // }))
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
    subscribe(instance, 'stageUpdate', ({ stageCount, stage, focusStage }) => {
      const lastStageCount = this.stageCount
      const lastStage = this.stage
      const lastFocusState = this.focusStage

      this.stage = stage
      this.stageCount = stageCount
      if (focusStage !== undefined) {
        this.focusStage = focusStage
        this.writePatternToGrid()
      }

      if (lastStage !== this.stage && this.isFocused) {
        this.writePatternToGrid()
      }

      if (this.stageCount > lastStageCount) {
        while (this.pattern.length < this.stageCount * this.steps) {
          this.pattern = [...cloneDeep(this.pattern), ...cloneDeep(this.pattern)]
        }
        this.pattern = cloneDeep(this.pattern).slice(0, this.stageCount * this.steps)
      } else {
        this.pattern = cloneDeep(this.pattern).slice(0, this.stageCount * this.steps)
      }
      this.inputPattern = cloneDeep(this.pattern)
    })
  }
}

module.exports = Sequencer
