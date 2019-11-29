import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Grid } from './Grid'
import { GridProvider, GridContext } from './GridContext'
import { WebSocketProvider, WebSocketContext } from './WebSocketContext'
import { Performer } from './Performer'

const App = () => {
  return (
    <AppContainer>
      <WebSocketProvider>
        <GridProvider>
          <GridWrapper>
            <Grid rows={16} cols={8} />
          </GridWrapper>
          <Performer />
        </GridProvider>
      </WebSocketProvider>
    </AppContainer>
  )
}

const GridWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
`

const AppContainer = styled.div`
  background: #040410;
  color: white;
`

export default App
