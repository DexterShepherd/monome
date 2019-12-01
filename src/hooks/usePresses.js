import {useState, useEffect } from 'react'
import { useGrid } from './useContexts'

const usePresses = (start, length) => {
  const [state, dispatch] = useGrid()
  const { cells, presses } = state

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
    setPressArray(indexes.map(index => Number(presses.includes(index))))
  }, [presses])

  return pressArray
}

export { usePresses }
