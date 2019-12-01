import React from 'react'
import styled from 'styled-components'
import accurateInterval from 'accurate-interval'
import { useGrid } from './hooks'

const Cell = props => {
  return <CellContainer {...props}></CellContainer>
}

const CellContainer = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid white;
  margin: 4px;
  border-radius: 4px;
  background: ${({ value }) => `rgba(255, 255, 255, ${value})`};
`

const Grid = ({ rows, cols }) => {
  const [state, dispatch] = useGrid()
  const { cells } = state

  const uvToIndex = (x, y) => {
    return x + y * rows
  }

  return (
    <GridContainer>
      {cells.map((row, i) => (
        <Cell
          key={i}
          value={cells[i]}
          onMouseDown={() => dispatch({ type: 'down', index: i })}
          onMouseUp={() => dispatch({ type: 'up', index: i })}
        />
      ))}
    </GridContainer>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, auto);
`

export { Grid, Cell }
