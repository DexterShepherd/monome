import { useContext } from 'react'
import { TrackContext, TransportContext, WebSocketContext, GridContext, MidiContext, SongContext } from '../context'

export const useWS = () => useContext(WebSocketContext)
export const useTrack = () => useContext(TrackContext)
export const useTransport = () => useContext(TransportContext)
export const useGrid = () => useContext(GridContext)
export const useMidi = () => useContext(MidiContext)
export const useSong = () => useContext(SongContext)
