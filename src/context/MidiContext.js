import React, { createContext, useEffect, useState } from 'react'
import webmidi from 'webmidi'

const MidiContext = createContext()

const MidiProvider = ({ children }) => {
  const [output, setOutput] = useState()
  const [midiReady, setMidiReady] = useState(false)

  useEffect(() => {
    webmidi.enable(err => {
      if (err) {
        return console.error(err)
      }
      setMidiReady(true)
    })
  }, [])

  useEffect(() => {
    if (midiReady) {
      setOutput(webmidi.getOutputByName('IAC Driver Bus 1'))
    }
  }, [midiReady])

  const state = {
    send: (note, channel, velocity, duration) => {
      if (output && midiReady) {
        output.playNote(note, channel, {
          velocity,
          duration
        })
      }
    }
  }

  return <MidiContext.Provider value={state}>{children}</MidiContext.Provider>
}

export { MidiContext, MidiProvider }
