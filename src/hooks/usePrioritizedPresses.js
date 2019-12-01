import { useContext, useState, useEffect } from 'react'
import { usePresses } from './usePresses'

const priority = Array(128)
  .fill()
  .map(_ => [])

const prioritizes = {}

const usePrioritizedPresses = (start, length, priorities, id) => {
  const presses = usePresses(start, length)
  const [mappedPresses, setMappedPresses] = useState([])

  useEffect(() => {
    if (prioritizes[id]) {
      prioritizes[id].forEach(i => {
        priority[i] = priority[i].filter(({ id: pId }) => id !== pId)
      })
    }

    priorities.forEach((v, i) => {
      const index = i + start
      priority[index] = [...priority[index], { v, id }].sort((a, b) => a.val - b.val).reverse()
    })

    prioritizes[id] = Array(length)
      .fill()
      .map((_, i) => i + start)
  }, [priorities])

  useEffect(() => {
    setMappedPresses(
      presses.map((v, i) => {
        const index = i + start
        if (priority[index][0] && priority[index][0].v == priorities[i]) {
          return v
        }

        return 0
      })
    )
  }, [presses, priorities])

  return mappedPresses
}

export { usePrioritizedPresses }
