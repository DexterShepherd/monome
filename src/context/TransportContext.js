import React, { createContext, useState, useEffect, useRef } from 'react'
import timer from 'accurate-interval'

const TransportContext = createContext()

const TransportProvider = ({ children }) => {
  const [position, setPosition] = useState(0)
  const [speed, setSpeed] = useState(100)
  const intervalRef = useRef()

  const step = () => {
    setPosition(position + 1)
  }

  useEffect(() => {
    intervalRef.current = timer(step, speed)
    return () => intervalRef.current && intervalRef.current.clear()
  }, [position, speed])

  const state = {
    position,
    speed
  }

  return <TransportContext.Provider value={state}>{children}</TransportContext.Provider>
}

export { TransportContext, TransportProvider }
