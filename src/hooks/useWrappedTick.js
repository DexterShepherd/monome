import { useEffect } from 'react'
import { useWrappedPos } from './useWrappedPos'

const useWrappedTick = (cb, length) => {
  const pos = useWrappedPos(length)

  useEffect(() => {
    cb(pos)
  }, [pos])

  return pos
}

export { useWrappedTick }
