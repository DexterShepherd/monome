import React from 'react'
import styled from 'styled-components'
import { Sequencer } from './Sequencer'

const Performer = ({ children }) => {
  return (
    <PerformerContainer>
      <p>Performer</p>
      <Sequencer startIndex={0} length={16} />
    </PerformerContainer>
  )
}

const PerformerContainer = styled.div`
  padding: 16px;
`

export { Performer }
