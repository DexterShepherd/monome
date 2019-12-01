import { useState, useEffect} from 'react'
import { useGrid } from './useContexts'

const useRender = (pattern, start) => {
  const [lastPattern, setLastPattern] = useState([])
  const [state, dispatch] = useGrid()

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

export { useRender }
