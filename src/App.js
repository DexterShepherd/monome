import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { RootContext } from './context'
import { Grid } from './Grid'
import { Performer } from './Performer'

const App = () => {
  return (
    <AppContainer>
      <RootContext>
        <GridWrapper>
          <Grid rows={16} cols={8} />
        </GridWrapper>
        <Performer />
      </RootContext>
    </AppContainer>
  )
}

const GridWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 64px;
`

const AppContainer = styled.div`
  background: #040410;
  color: white;
  min-height: 100vh;
`

export default App
