const { observable } = require('mobx')
const easymidi = require('easymidi')

const output = new easymidi.Output('IAC Driver Bus 1')
const midi = observable({
  output,
  on: (note, velocity, channel, offTime) => {
    if (output) {
      output.send('noteon', { note, velocity, channel })
    }

    const off = () => {
      if (output) {
        output.send('noteoff', { note, velocity: 0, channel })
      }
    }

    if (offTime) {
      setTimeout(off, offTime)
    }

    return off
  },
  off: (note, channel) => {
    output.send('noteoff', { note, velocity: 0, channel })
  }
})

module.exports = midi
