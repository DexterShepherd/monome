const { action } = require('mobx')
const store = require('./store')

const up = action((index, value) => {
  store.grid[index] = value
})

const down = action((index, value) => {
  store.grid[index] = 0
})

module.exports = { up, down, set: up }
