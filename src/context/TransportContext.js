import React, { createContext, useState, useEffect, useRef, useCallback, useReducer } from 'react'
import timer from 'accurate-interval'
import Tone from 'tone'
import { useMidi } from '../hooks'
import WAAClock from 'waaclock'

const audioContext = new AudioContext()

const TransportContext = createContext()

const TransportProvider = ({ children }) => {
  // const [position, setPosition] = useState(0)
  const [clock, setClock] = useState()
  const [speed, setSpeed] = useState(100)
  const intervalRef = useRef()
  const { send } = useMidi()
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
  }, [dispatch, send])

  useEffect(() => {
    setClock(new WAAClock(audioContext))
  }, [])

  useEffect(() => {
    if (clock) {
      clock.start()
      clock.setTimeout(step, 0).repeat(0.1)
    }
  }, [clock])

  const state = {
    position,
    speed
  }

  return <TransportContext.Provider value={state}>{children}</TransportContext.Provider>
}

export { TransportContext, TransportProvider }
