const EventEmitter = require('events')

class Bus extends EventEmitter {}
Bus.defaultMaxListeners = 128

const bus = new Bus()

const subscribe = (instance, key, cb) => {
  bus.on(`${instance.id}-${key}`, cb)
}

module.exports = { bus, subscribe }
