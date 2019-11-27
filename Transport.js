const accurateInterval = require('accurate-interval')


const tickRate = 100
let tick = 0
const tickCallbacks = []

const onTick = (callback) => {
  tickCallbacks.push(callback)
}

accurateInterval(() => {
  tickCallbacks.forEach((cb) => {
    cb(tick)
  })
  tick += 1
}, tickRate)

module.exports = {
  tick,
  onTick
}
