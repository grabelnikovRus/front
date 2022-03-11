import { createGlobalState } from 'react-use'

type MenuMobileState = {
  isOpenMenu: boolean
  isOpenFilterCatalog: boolean
  isOpenFilterMap: boolean
  isOpenList: boolean
  openMenu: () => void
  openFilterCatalog: () => void
  openFilterMap: () => void
  openList: () => void
  closeMenu: () => void
  closeFilterCatalog: () => void
  closeFilterMap: () => void
  closeList: () => void
  toggleMenu: () => void
  toggleFilterCatalog: () => void
  toggleFilterMap: () => void
  toggleList: () => void
}

const useMenuMobileGlobalState = createGlobalState({
  isOpenMenu: true,
  isOpenFilterMap: false,
  isOpenFilterCatalog: false,
  isOpenList: false,
})

export const useMenuMobile = (): MenuMobileState => {
  const [state, setState] = useMenuMobileGlobalState()

  const openMenu = () => setState((state) => ({ ...state, isOpenMenu: true }))
  const openFilterCatalog = () => setState((state) => ({ ...state, isOpenFilterCatalog: true }))
  const openFilterMap = () => setState((state) => ({ ...state, isOpenFilterMap: true }))
  const openList = () => setState((state) => ({ ...state, isOpenList: true }))

  const closeMenu = () => setState((state) => ({ ...state, isOpenMenu: false }))
  const closeFilterCatalog = () => setState((state) => ({ ...state, isOpenFilterCatalog: false }))
  const closeFilterMap = () => setState((state) => ({ ...state, isOpenFilterMap: false }))
  const closeList = () => setState((state) => ({ ...state, isOpenList: false }))

  const toggleMenu = () => setState((state) => ({ ...state, isOpenMenu: !state.isOpenMenu }))
  const toggleFilterCatalog = () =>
    setState((state) => ({ ...state, isOpenFilterCatalog: !state.isOpenFilterCatalog }))
  const toggleFilterMap = () =>
    setState((state) => ({ ...state, isOpenFilterMap: !state.isOpenFilterMap }))
  const toggleList = () => setState((state) => ({ ...state, isOpenList: !state.isOpenList }))

  return {
    ...state,
    openMenu,
    openFilterCatalog,
    openFilterMap,
    openList,
    closeMenu,
    closeFilterCatalog,
    closeFilterMap,
    closeList,
    toggleMenu,
    toggleFilterCatalog,
    toggleFilterMap,
    toggleList,
  }
}
