import React, { createContext, useState, useEffect, useRef, useCallback, useReducer } from 'react'
import timer from 'accurate-interval'
import Tone from 'tone'

const TransportContext = createContext()

const TransportProvider = ({ children }) => {
  // const [position, setPosition] = useState(0)
  const [speed, setSpeed] = useState(100)
  const intervalRef = useRef()
  const [{ position }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'inc':
          return { position: state.position + 1 }
      }
    },
    {
      position: 0
    }
  )

  const step = useCallback(() => {
    dispatch({ type: 'inc' })
  }, [dispatch])

  useEffect(() => {
    Tone.Transport.bpm.value = 124
    Tone.Transport.start()
    Tone.Transport.scheduleRepeat(step, '16n')
  }, [])

  const state = {
    position,
    speed
  }

  return <TransportContext.Provider value={state}>{children}</TransportContext.Provider>
}

export { TransportContext, TransportProvider }
