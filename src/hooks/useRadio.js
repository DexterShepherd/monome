import { useState, useEffect } from 'react'

const useRadio = pattern => {
  const [radioPattern, setRadioPattern] = useState([])
  const [radioValue, setRadioValue] = useState(0)

  useEffect(() => {
    const v = pattern.findIndex(v => v == 1)
    if (v >= 0) {
      setRadioValue(v)
    }
  }, [pattern])

  useEffect(() => {
    setRadioPattern(
      Array(pattern.length)
        .fill()
        .map((_, i) => (i == radioValue ? 1 : 0))
    )
  }, [radioValue])

  return [radioPattern, radioValue, setRadioValue]
}

export { useRadio }
