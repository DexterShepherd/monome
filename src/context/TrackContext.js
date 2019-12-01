import React, { createContext, useState, useEffect } from 'react'
import { PerformerContainer } from '../Performer'
import { useMidi, useWrappedTick, useSong } from '../hooks'
import { BinaryInput } from '../BinaryInput'

const TrackContext = createContext()

const TrackProvider = ({ children, index }) => {
  const [focused, setFocused] = useState(false)
  const [pattern, setPattern] = useState([])
  const [patterns, setPatterns] = useState({})
  const [note, setNote] = useState(0)
  const { send } = useMidi()
  const { focusedIndex } = useSong()

  useEffect(() => {
    setFocused(focusedIndex == index)
  }, [focusedIndex])

  useEffect(() => {
    const pArr = []
    Object.keys(patterns).forEach(k => {
      patterns[k].forEach((v, i) => {
        pArr[i] = Math.max(v, pArr[i] || 0)
      })
    })
    setPattern(pArr)
  }, [patterns])

  useWrappedTick(tick => {
    if (pattern[tick]) {
      send(note, 1, 1, 100)
    }
  }, 16)

  const state = {
    focused,
    pattern,
    index,
    addPattern: (pattern, key) => setPatterns({ ...patterns, [key]: pattern })
  }

  return (
    <TrackContext.Provider value={state}>
      <PerformerContainer>
        <BinaryInput name={'note'} onChange={setNote} startIndex={80} length={8} />
        pattern:[
        {pattern.map((v, i) => (
          <span key={i}>{v}</span>
        ))}
        ]{children}
      </PerformerContainer>
    </TrackContext.Provider>
  )
}

export { TrackContext, TrackProvider }
