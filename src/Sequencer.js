import React, { useContext, useEffect, useState, useRef } from 'react'
import { GridContext, TrackContext } from './context'
import timer from 'accurate-interval'
import { BinaryInput } from './BinaryInput'
import { PerformerContainer } from './Performer'

import { useWrappedTick, useGrid, useToggles, usePresses } from './hooks'

const Sequencer = ({ startIndex, length }) => {
  const [state, dispatch] = useContext(GridContext)
  const { addPattern, pattern } = useContext(TrackContext)

  const seqPattern = useToggles(usePresses(startIndex, length))

  useGrid(pattern, startIndex)

  useEffect(() => {
    addPattern(seqPattern, 'seq')
  }, [seqPattern])

  const position = useWrappedTick(position => {
    dispatch({ type: 'on', index: startIndex + position })
    const lastPos = (position + length - 1) % length
    if (!pattern[lastPos]) {
      dispatch({ type: 'off', index: startIndex + lastPos })
    }
  }, length)

  return (
    <PerformerContainer>
      <p> Sequencer {position} </p>
    </PerformerContainer>
  )
}

export { Sequencer }
