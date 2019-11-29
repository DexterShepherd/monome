import React, { useContext, useEffect, useState, useRef } from 'react'
import { GridContext } from './GridContext'
import timer from 'accurate-interval'
import { NumberInput } from './NumberInput'

const Sequencer = ({ startIndex, length }) => {
  const [pos, setPos] = useState(0)
  const intervalRef = useRef()
  const [state, dispatch] = useContext(GridContext)
  const { cells } = state

  const step = () => {
    setPos((pos + 1) % length)
  }

  useEffect(() => {
    dispatch({ type: 'on', index: startIndex + pos })
    dispatch({ type: 'off', index: startIndex + ((pos + length - 1) % length) })
    dispatch({ type: 'on', index: startIndex + pos + 16 })
    dispatch({ type: 'off', index: startIndex + 16 + ((pos + length - 1) % length) })
  }, [pos, length])

  useEffect(() => {
    intervalRef.current = timer(step, 100)
    return () => intervalRef.current && intervalRef.current.clear()
  }, [pos])

  return (
    <div>
      <p> Sequencer {pos} </p>
      <NumberInput startIndex={startIndex + length} onChange={value => console.log(value)} />
    </div>
  )
}

export { Sequencer }
