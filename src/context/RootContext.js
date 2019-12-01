import React from 'react'
import { GridProvider } from './GridContext'
import { WebSocketProvider } from './WebSocketContext'
import { TransportProvider } from './TransportContext'
import { MidiProvider } from './MidiContext'
import { SongProvider } from './SongContext'

const RootContext = ({ children }) => (
  <MidiProvider>
    <WebSocketProvider>
      <GridProvider>
        <SongProvider>
          <TransportProvider>{children}</TransportProvider>
        </SongProvider>
      </GridProvider>
    </WebSocketProvider>
  </MidiProvider>
)

export { RootContext }
