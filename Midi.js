const easymidi = require('easymidi')

const output = new easymidi.Output('IAC Driver Bus 1')

const send = ({ channel, note, velocity }, stopTimeout = null) => {
  output.send('noteon', {
    channel,
    note,
    velocity
  })

  const off = () => output.send('noteoff', { channel, note, velocity: 0 })

  if (stopTimeout) {
    setTimeout(off, stopTimeout)
  }

  return off
}

module.exports = {
  output,
  send
}
