import React, { useState, useEffect, useContext } from 'react'
import { BinaryInput } from './BinaryInput'
import { PerformerContainer } from './Performer'
import { TrackContext } from './context'
import er from 'euclidean-rhythms'
import rotate from 'rotate-array'

const Euclidean = ({ startIndex }) => {
  const [pulses, setPulses] = useState(0)
  const [offset, setOffset] = useState(0)
  const [pattern, setPattern] = useState([])
  const { addPattern } = useContext(TrackContext)

  useEffect(() => {
    setPattern(rotate(er.getPattern(pulses, 16), offset * -1))
  }, [pulses, offset])

  useEffect(() => {
    addPattern(pattern, 'euclid')
  }, [pattern])

  return (
    <PerformerContainer>
      <p>
        Euclidean: [
        {pattern.map((v, i) => (
          <span key={i}>{v}</span>
        ))}
        ]
      </p>
      <BinaryInput length={4} startIndex={startIndex} name={'pulses'} onChange={setPulses} />
      <BinaryInput length={4} startIndex={startIndex + 4} name={'offset'} onChange={setOffset} />
    </PerformerContainer>
  )
}

export { Euclidean }
