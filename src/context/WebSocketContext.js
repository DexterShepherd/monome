import React, { createContext, useState, useEffect, useCallback } from 'react'

const initialState = {
  ws: null
}

const WebSocketContext = createContext(initialState)

const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState()
  const [ready, setReady] = useState(false)
  const [q, setQ] = useState([])
  const [onMessageQ, setOnMessageQ] = useState([])

  useEffect(() => {
    setWs(new WebSocket('ws://localhost:8080'))
  }, [])

  useEffect(() => {
    if (ws) {
      ws.onclose = () => {
        setReady(false)
      }
      ws.onopen = () => {
        setReady(true)
      }

      ws.onmessage = message => {
        const { x, y, s } = JSON.parse(message.data)
        const index = x + y * 8
        onMessageQ.forEach(cb => {
          cb(index, s)
        })
      }
    }
  }, [ws, onMessageQ])

  const clear = () => {
    if (ws && ready) {
      ws.send(JSON.stringify({ type: 'clear' }))
    }
  }

  useEffect(() => {
    clear()
  }, [ws, ready])
  useEffect(() => {
    if (q.length) {
      if (ws && ready) {
        q.forEach(data => {
          ws.send(JSON.stringify(data))
        })
        setQ([])
      }
    }
  }, [q, ws, ready])

  const set = data => {
    if (ws && ready) {
      ws.send(JSON.stringify(data))
    }
  }

  const onMessage = useCallback(
    cb => {
      setOnMessageQ([...onMessageQ, cb])
    },
    [onMessageQ]
  )

  const state = {
    ws,
    set,
    ready,
    onMessage,
    clear
  }

  return <WebSocketContext.Provider value={state}>{children}</WebSocketContext.Provider>
}

export { WebSocketContext, WebSocketProvider }
