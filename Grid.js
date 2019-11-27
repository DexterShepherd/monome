const serialosc = require('serialosc')

const { bus } = require('./EventBus')


serialosc.start()

let monomeRef

const Grid = Array(8)
  .fill()
  .map(_ =>
    Array(16)
      .fill()
      .map(_ => 0)
  )

let queue = []

const set = (x, y, s) => {
  Grid[x][y] = s
  if (monomeRef) {
    monomeRef.levelSet({ x, y, l: s ? 5 : 0 })
  } else {
    queue.push({ f: 'levelSet', a: { x, y, l: s ? 5 : 0 } })
  }
}

const get = (x, y) => Grid[x][y]

serialosc.on('device:add', function(device) {
  console.info('connected')
  device.all(0)
  monomeRef = device
  if (queue.length) {
    queue.forEach(({ f, a }) => {
      device[f](a)
    })
    queue = []
  }
  device.on('key', data => bus.emit('key', data))
})

module.exports = {
  get,
  set,
}
