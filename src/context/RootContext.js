import React from 'react'
import { GridProvider } from './GridContext'
import { WebSocketProvider } from './WebSocketContext'
import { TransportProvider } from './TransportContext'

const RootContext = ({children}) => (
      <WebSocketProvider>
        <GridProvider>
          <TransportProvider>
              {children}

          </TransportProvider>
        </GridProvider>
      </WebSocketProvider>
)

export { RootContext }
