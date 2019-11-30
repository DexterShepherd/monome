import React from 'react'
import styled from 'styled-components'
import { Sequencer } from './Sequencer'
import { Euclidean } from './Euclidean'
import { TrackProvider } from './context'

const Performer = ({ children }) => {
  return (
    <Wrapper>
      <p>Performer</p>
      <TrackProvider>
        <Euclidean startIndex={104} />
        <Sequencer startIndex={112} length={16} />
      </TrackProvider>
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
