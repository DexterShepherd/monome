import React, { useEffect, useState } from 'react'
import { useGrid } from './hooks'

const NumberInput = ({ startIndex, onChange }) => {
  const [value, setValue] = useState(1)
  const [state, dispatch] = useGrid()
  const { cells } = state

  useEffect(() => {
    dispatch({ type: 'on', index: startIndex + value })
  }, [value, startIndex])

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value])

  return <p>Number {value}</p>
}

export { NumberInput }
