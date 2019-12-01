import React, { createContext, useState, useEffect } from 'react'
import { useGrid } from '../hooks'
import { NumberInput } from '../NumberInput'

const SongContext = createContext()

const SongProvider = ({ children }) => {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [_, dispatch] = useGrid()

  const state = {
    focusedIndex,
    setFocusedIndex
  }

  useEffect(() => {
    dispatch({ type: 'clear' })
  }, [focusedIndex])

  return (
    <SongContext.Provider value={state}>
      <NumberInput name={'track'} onChange={value => setFocusedIndex(value)} startIndex={0} length={8} />
      <span>Track number {focusedIndex + 1} </span>
      {children}
    </SongContext.Provider>
  )
}

export { SongContext, SongProvider }
