import { useState, useEffect, useContext } from 'react'
import { GridContext } from '../context'

const useGrid = (pattern, start) => {
  const [lastPattern, setLastPattern] = useState([])
  const [state, dispatch] = useContext(GridContext)

  useEffect(() => {
    pattern.forEach((v, i) => {
      if (v !== lastPattern[i]) {
        dispatch({ index: start + i, type: v ? 'on' : 'off' })
      }
    })
    setLastPattern(pattern)
  }, [pattern])

  return pattern
}

export { useGrid }
