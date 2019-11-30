import React, { useState, useEffect } from 'react'
import { useWrappedTick, useGrid, useToggles, usePresses } from './hooks'
import { PerformerContainer } from './Performer'

const BinaryInput = ({ length, startIndex, name, onChange }) => {
  const [value, setValue] = useState(0)
  const bits = useToggles(usePresses(startIndex, length))

  useGrid(bits, startIndex)

  useEffect(() => {
    setValue(
      parseInt(
        bits
          .slice()
          .reverse()
          .join(''),
        2
      )
    )
  }, [bits])

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value])

  return (
    <PerformerContainer>
      <p>
        {name || 'Binary Input'} {value}
      </p>
    </PerformerContainer>
  )
}

export { BinaryInput }
