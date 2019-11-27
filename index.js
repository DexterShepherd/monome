var serialosc = require('serialosc');
const accurateInterval = require('accurate-interval')
const easymidi = require('easymidi')

const output = new easymidi.Output('IAC Driver Bus 1')

serialosc.start();

const createGrid = (set) => Array(16).fill().map((_, i) => Array(8).fill().map((_, j)=> set(i, j)))


const grid = createGrid(_ => 0)
let lastGrid = createGrid(_ => 0)

let monome
serialosc.on('device:add', function (device) {
  monome = device
  device.on('key', function ({x, y, s}) {
    if ( s == 1 ) {
      output.send("noteon", {
        note: x + ((7 - y) * 5) + 12,
        velocity: 127,
        channel: 1,
      })
    } else {
      output.send("noteoff", {
        note: x + (( 7 - y ) * 5) + 12,
        velocity: 127,
        channel: 1,
      })
    }
    updateGrid(createGrid((i, j) => (([0, 2, 4, 5, 7, 9, 11].includes(((7 - i) + j * 5 ) % 12))) ? 1 : 0))
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


const updateGrid = (newGrid) => {
  const diff = diffGrids(lastGrid, newGrid)
  
  diff.forEach(({ x, y, val }) => {
    if (monome) {
      monome.set({x, y, s: val})
    }
  })

  lastGrid = newGrid
}

