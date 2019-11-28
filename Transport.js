const accurateInterval = require('accurate-interval')

const { bus } = require('./EventBus')
const tickRate = 111.94
let tick = 0
const tickCallbacks = []

const onTick = callback => {
  tickCallbacks.push(callback)
}

accurateInterval(() => {
  tickCallbacks.forEach(cb => {
    cb(tick)
  })
  bus.emit('tick', tick)
  tick += 1
}, tickRate)

module.exports = {
  tick,
  tickRate,
  onTick
}
