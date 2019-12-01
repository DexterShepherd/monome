import React, { useState, useEffect, useContext } from 'react'
import { BinaryInput } from './BinaryInput'
import { PerformerContainer } from './Performer'
import { TrackContext } from './context'
import { usePresses, useToggles, useGrid } from './hooks'
import er from 'euclidean-rhythms'
import rotate from 'rotate-array'

const Euclidean = ({ startIndex }) => {
  const [pulses, setPulses] = useState(0)
  const [offset, setOffset] = useState(0)
  const [rootPattern, setRootPattern] = useState([])
  const [pattern, setPattern] = useState([])
  const { addPattern } = useContext(TrackContext)
  const [mutedSteps, setMutedSteps] = useToggles(usePresses(startIndex + 8, 16))

  useGrid(pattern, startIndex + 8)

  useEffect(() => {
    setPattern(rootPattern.map((v, i) => (mutedSteps[i] ? 0 : v)))
  }, [rootPattern, mutedSteps])

  useEffect(() => {
    addPattern(pattern, 'euclid')
  }, [pattern])

  useEffect(() => {
    setRootPattern(rotate(er.getPattern(pulses, 16), offset * -1))
    setMutedSteps([])
  }, [pulses, offset])

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
