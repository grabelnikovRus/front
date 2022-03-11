import { createGlobalState } from 'react-use'

import { IAddressFormData } from '@/components/sell-request-form/sell-request-form.types'

type SellRequestState = {
  isOpen: boolean
  address: IAddressFormData
  openSellRequest: () => void
  closeSellRequest: () => void
  toggleSellRequest: () => void
  setAddress: (data: IAddressFormData) => void
}

const useSellRequestState = createGlobalState({
  isOpen: false,
  address: { address: '' },
})

export const useLayoutSellRequest = (): SellRequestState => {
  const [state, setState] = useSellRequestState()

  const setAddress = (data: IAddressFormData) =>
    setState((state) => ({ ...state, address: data }))
  const openSellRequest = () => setState((state) => ({ ...state, isOpen: true }))
  const closeSellRequest = () => setState((state) => ({ ...state, isOpen: false }))
  const toggleSellRequest = () => setState((state) => ({ ...state, isOpen: !state.isOpen }))

  return {
    ...state,
    setAddress,
    openSellRequest,
    closeSellRequest,
    toggleSellRequest,
  }
}
