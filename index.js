const state = require('./store')
const { autorun } = require('mobx')
const Sequencer = require('./Sequencer')
const Fourths = require('./Fourths')

const main = async () => {
  try {
    await state.ready
    new Sequencer(0, 16)
    // new Sequencer(32 + 16, 16)
    // new Sequencer(64 + 16, 16)
    // new Sequencer(96 + 16, 16)
  } catch (err) {
    console.error(err)
  }

  // new Sequencer(64, 16)
  // new Sequencer(0, 32)

  // new Fourths(0, 127);
}

main()
