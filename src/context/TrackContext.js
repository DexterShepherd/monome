import React, { createContext, useState, useEffect } from 'react'
import { PerformerContainer } from '../Performer'

const TrackContext = createContext()

const TrackProvider = ({ children }) => {
  const [focused, setFocused] = useState(false)
  const [pattern, setPattern] = useState([])
  const [patterns, setPatterns] = useState({})

  useEffect(() => {
    const pArr = []
    Object.keys(patterns).forEach(k => {
      patterns[k].forEach((v, i) => {
        pArr[i] = Math.max(v, pArr[i] || 0)
      })
    })
    setPattern(pArr)
  }, [patterns])

  const state = {
    focused,
    setFocused,
    pattern,
    addPattern: (pattern, key) => setPatterns({ ...patterns, [key]: pattern })
  }

  return (
    <TrackContext.Provider value={state}>
      <PerformerContainer>
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
