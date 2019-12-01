import { useState, useEffect } from 'react'
import { useSong, useTrack } from '.'

const useFocused = debug => {
  const [focused, setFocused] = useState(false)
  const { focusedIndex } = useSong()
  const track = useTrack()

  return track ? track.focused : true
}

export { useFocused }
