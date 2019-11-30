import { useContext } from 'react'
import { TransportContext } from '../context'

const useWrappedPos = length => {
  const { position } = useContext(TransportContext)

  return position % length
}

export { useWrappedPos }
