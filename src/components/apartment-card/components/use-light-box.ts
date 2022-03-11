import { createGlobalState } from 'react-use'

interface LightBoxState {
  toggler: boolean
  slide: number
  isOpen: boolean
  openLightbox: (num: number) => void
  updateOpenStatus: (isOpen: boolean) => void
}

const useLightboxGlobalState = createGlobalState({
  toggler: false,
  slide: 1,
  isOpen: false,
})

export const useLightBox = (): LightBoxState => {
  const [state, setState] = useLightboxGlobalState()

  const openLightbox = (num: number) =>
    setState((state) => ({ ...state, slide: num, toggler: !state.toggler }))

  const updateOpenStatus = (isOpen: boolean) => setState((state) => ({ ...state, isOpen }))

  return { ...state, openLightbox, updateOpenStatus }
}
