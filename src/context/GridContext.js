import React, { createContext, useState, useEffect, useReducer } from 'react'
import { useWS } from '../hooks'

const initialState = {
  cells: Array(128)
    .fill()
    .map(_ => 0),
  presses: []
}

const GridContext = createContext()

const GridProvider = ({ children }) => {
  const { set, onMessage, clear } = useWS()

  const reducer = (state, action) => {
    switch (action.type) {
      case 'clear':
        clear()
        return initialState
      case 'on':
        set({ index: action.index, s: 1 })
        return {
          ...state,
          cells: state.cells.map((v, i) => (i == action.index ? 1 : v))
        }
      case 'off':
        set({ index: action.index, s: 0 })
        return {
          ...state,
          cells: state.cells.map((v, i) => (i == action.index ? 0 : v))
        }
      case 'down':
        return {
          ...state,
          presses: [...state.presses, action.index]
        }
      case 'up':
        return {
          ...state,
          presses: state.presses.filter(i => i !== action.index)
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    onMessage((i, s) => {
      if (s == 1) {
        dispatch({ type: 'down', index: i })
      }
      if (s == 0) {
        dispatch({ type: 'up', index: i })
      }
    })
  }, [])

  return <GridContext.Provider value={[state, dispatch]}>{children} </GridContext.Provider>
}

export { GridContext, GridProvider }
