import 'react-yandex-maps'

declare module 'react-yandex-maps' {
  interface IBoundsEvent extends ymaps.IEvent {
    originalEvent: {
      newBounds: number[][]
    }
  }

  export interface MapProps {
    instanceRef?: (instance: ymaps.Map) => void
    onBoundsChange?: (event: IBoundsEvent) => void
  }

  export interface ObjectManagerProps {
    instanceRef?: (instance: ymaps.ObjectManager) => void
  }
}
