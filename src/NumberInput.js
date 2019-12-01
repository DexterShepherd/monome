import React, { useEffect, useState } from 'react'
import { usePresses, useRadio, useRender } from './hooks'

const NumberInput = ({ startIndex, length, onChange, name }) => {
  const [buffer, value] = useRadio(usePresses(startIndex, length))

  useRender(buffer, startIndex)

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value])

  return (
    <p>
      {name || 'number'} {value}
    </p>
  )
}

export { NumberInput }
