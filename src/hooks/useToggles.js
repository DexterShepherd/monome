import { useState, useEffect } from 'react'

const useToggles = pattern => {
  const [toggles, setToggles] = useState(
    Array(pattern.length)
      .fill()
      .map(_ => 0)
  )

  useEffect(() => {
    if (pattern.includes(1)) {
      setToggles(
        pattern.map((v, i) => {
          return v ? Number(!toggles[i]) : toggles[i]
        })
      )
    }
  }, [pattern])

  return toggles
}

export { useToggles }
