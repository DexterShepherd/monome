import { useContext } from 'react'
import { TrackContext, TransportContext, WebSocketContext, GridContext } from '../context'

export const useWS = () => useContext(WebSocketContext)
export const useTrack = () => useContext(TrackContext)
export const useTransport = () => useContext(TransportContext)
export const useGrid = () => useContext(GridContext)
