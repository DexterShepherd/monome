const Websocket = require('ws')
const serialosc = require('serialosc')
const interval = require('accurate-interval')

const wss = new Websocket.Server({ port: '8080' })
serialosc.start()

let deviceRef
let socketRef

serialosc.on('device:add', function(device) {
  console.info('connected')
  deviceRef = device
  device.on('key', data => {
    if (socketRef) {
      socketRef.send(JSON.stringify(data))
    }
  })

  device.all(0)
})

const uvFromIndex = i => {
  const x = i % 8
  const y = Math.floor(i / 8)
  return { x, y }
}

wss.on('connection', function connection(ws) {
  socketRef = ws
  ws.on('message', function incoming(message) {
    const m = JSON.parse(message)
    if (deviceRef) {
      const { x, y } = uvFromIndex(m.index)
      deviceRef.levelSet(x, y, m.s * 5)
    }
  })
})
