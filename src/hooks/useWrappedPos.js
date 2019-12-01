import { useTransport } from './useContexts'

const useWrappedPos = length => {
  const { position } = useTransport() 

  return position % length
}

export { useWrappedPos }
