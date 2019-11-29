import React, { createContext, useState, useEffect, useReducer, useContext } from 'react'
import { WebSocketContext } from './WebSocketContext'

const initialState = {
  cells: Array(128)
    .fill()
    .map(_ => 0)
}

const GridContext = createContext()

const GridProvider = ({ children }) => {
  const { set, onMessage } = useContext(WebSocketContext)

  const reducer = (state, action) => {
    switch (action.type) {
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
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    onMessage((i, s) => {
      if (s == 1) {
        dispatch({ type: 'on', index: i })
      }
      if (s == 0) {
        dispatch({ type: 'off', index: i })
      }
    })
  }, [])

  return <GridContext.Provider value={[state, dispatch]}>{children} </GridContext.Provider>
}

export { GridContext, GridProvider }
