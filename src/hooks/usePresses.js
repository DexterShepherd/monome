import { useState, useEffect } from 'react'
import { useGrid } from './useContexts'
import { useFocused } from '.'

const usePresses = (start, length) => {
  const [state, dispatch] = useGrid()
  const { cells, presses } = state
  const focused = useFocused()

  const [pressArray, setPressArray] = useState(
    Array(length)
      .fill()
      .map(_ => 0)
  )

  const [indexes, setIndexes] = useState(
    Array(length)
      .fill()
      .map((_, i) => i + start)
  )

  useEffect(() => {
    if (focused) {
      setPressArray(indexes.map(index => Number(presses.includes(index))))
    }
  }, [presses, focused])

  return pressArray
}

export { usePresses }
