import { useState, useEffect } from 'react'
import { useGrid } from './useContexts'
import { useFocused } from '.'

const useRender = (pattern, start) => {
  const [lastPattern, setLastPattern] = useState([])
  const [state, dispatch] = useGrid()
  const focused = useFocused()

  useEffect(() => {
    if (focused) {
      pattern.forEach((v, i) => {
        if (v !== lastPattern[i]) {
          dispatch({ index: start + i, type: v ? 'on' : 'off' })
        }
      })
    }
    setLastPattern(pattern)
  }, [pattern, focused])

  return pattern
}

export { useRender }
