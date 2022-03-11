import { useMedia } from 'react-use'

export const useMediaSmallScreen = (): boolean => useMedia('(max-width: 767px)')

export const useMediaMediumScreen = (): boolean =>
  useMedia('(min-width: 768px) and (max-width: 1439px)')

export const useMediaWideScreen = (): boolean => useMedia('(min-width: 1440px)')
