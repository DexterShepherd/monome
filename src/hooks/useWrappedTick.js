import { useLayoutEffect } from 'react'
import { useWrappedPos } from './useWrappedPos'

const useWrappedTick = (cb, length) => {
  const pos = useWrappedPos(length)

  useLayoutEffect(() => {
    cb(pos)
  }, [pos])

  return pos
}

export { useWrappedTick }
