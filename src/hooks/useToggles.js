import { useState, useEffect } from 'react'
import { usePrevious } from './usePrevious'


const useToggles = pattern => {
  const [toggles, setToggles] = useState(
    Array(pattern.length)
      .fill()
      .map(_ => 0)
  )

  const last = usePrevious(pattern)

  useEffect(() => {
    if (pattern.includes(1)) {
      setToggles(
        pattern.map((v, i) => {
          if (v !== last[i]) {
            return v ? Number(!toggles[i]) : toggles[i]
          }
          return toggles[i]
        })
      )
    }
  }, [pattern])

  return [toggles, setToggles]
}

export { useToggles }
