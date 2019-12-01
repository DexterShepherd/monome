import React, { useState } from 'react'
import styled from 'styled-components'
import { Sequencer } from './Sequencer'
import { Euclidean } from './Euclidean'
import { TrackProvider } from './context'

const Performer = ({ children }) => {
  const [tracks, setTracks] = useState(
    Array(8)
      .fill()
      .map((_, i) => i)
  )
  return (
    <Wrapper>
      <p>Performer</p>

      {tracks.map(i => (
        <TrackProvider key={i} index={i}>
          <Euclidean startIndex={88} />
          <Sequencer startIndex={112} length={16} />
        </TrackProvider>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
`

const PerformerContainer = styled.div`
  padding-left: 16px;
`

export { Performer, PerformerContainer }
