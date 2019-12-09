const serialosc = require('serialosc')
const interval = require('accurate-interval')
const { observable, action, autorun } = require('mobx')

let readyResolver = null

const state = observable({
  monome: null,
  ready: new Promise(res => (readyResolver = res)),
  pos: 0,
  grid: Array(128)
    .fill()
    .map(_ => 0),
  presses: []
})

autorun(async () => {
  if (state.monome && state.grid) {
    const gridUpdate = { top: [], bottom: [] }
    for (let i = 0; i < 8; i++) {
      gridUpdate.top[i] = []
      gridUpdate.bottom[i] = []
      for (let j = 0; j < 8; j++) {
        let index = j + i * 8
        let index2 = j + (i + 8) * 8
        gridUpdate.top[i][j] = state.grid[index]
        gridUpdate.bottom[i][j] = state.grid[index2]
      }
    }
    state.monome.levelMap(0, 0, gridUpdate.top)
    state.monome.levelMap(0, 8, gridUpdate.bottom)
  }
})

function init() {
  serialosc.start()

  return new Promise(function(res) {
    serialosc.on(
      'device:add',
      action(function(device) {
        device.all(0)
        console.log('connected')
        state.monome = device

        device.on('key', ({ x, y, s }) => {
          const index = x + y * 8
          if (s == 1) {
            state.presses = [...state.presses, index]
          } else {
            state.presses = state.presses.filter(v => v !== index)
          }
        })

        // state.grid[0] = 1
        res()
        if (readyResolver) {
          readyResolver()
        }
        interval(
          action(() => {
            state.pos = state.pos + 1
          }),
          60000.0 / 124.0 / 4.0
        )
      })
    )
  })
}

init()

module.exports = state
