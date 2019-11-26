var serialosc = require('serialosc');
const accurateInterval = require('accurate-interval')
const easymidi = require('easymidi')

console.log(easymidi.getOutputs())

const output = new easymidi.Output('IAC Driver Bus 1')

serialosc.start();

const grid = (set) => Array(16).fill().map((_, i) => Array(8).fill().map((_, j)=> set(i, j)))


const patterns = grid(_ => 0)

let monome
serialosc.on('device:add', function (device) {
  monome = device
  device.on('key', function ({x, y, s}) {
    if ( s == 1 ) {
      patterns[x][y] = Number(!patterns[x][y])
    }
  })
})

const diffGrids = (a, b) => {
  const changes = []
  a.forEach((rowA, i) => {
    rowA.forEach((valA, j) => {
      const valB = b[i][j]
      if ( valA !== valB ) {
        changes.push({x: i, y: j, val: valB})
      }
    })
  })
  return changes
}

const initial = grid(() => 0)
let lastGrid = initial


const updateGrid = (newGrid) => {
  const diff = diffGrids(lastGrid, newGrid)
  
  diff.forEach(({ x, y, val }) => {
    if (monome) {
      monome.set({x, y, s: val})
    }
  })

  lastGrid = newGrid
}

let pos = 0
const update = () => {
  pos = ( pos + 1 ) % 16
  patterns.forEach((col, i) => {
    if ( i == pos ) {
      col.forEach((note, j) => {
        if ( note == 1 ) {
          console.log(i, j)
          output.send('noteon', {
            note: (7 - j) + 36,
            velocity: 127,
            channel: 0
          })
          setTimeout(() => {
            output.send('noteoff', {
              note: (7 - j)+ 36,
              velocity: 127,
              channel: 0
            })
          }, 50)
        }
      })
    }
  })
  updateGrid(grid((x, y) => {
      return (x == pos || patterns[x][y] == 1) ? 1 : 0
  }))
}



const interval = setInterval(update, 100)

