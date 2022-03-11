import { VFC } from 'react'
import { withYMaps, YMapsApi } from 'react-yandex-maps'

export interface ApartmentPanoramaProps {
  ymaps?: YMapsApi
  coordinates: number[]
  checkPanorama?: (value: boolean) => void
  isShowPanorama: boolean
}

const PanoramaComponent: VFC<ApartmentPanoramaProps> = ({
  ymaps,
  coordinates,
  checkPanorama,
  isShowPanorama,
}) => {
  if (!ymaps?.panorama.isSupported()) {
    return null
  }

  ymaps.panorama.locate(coordinates).done(
    function (panoramas: unknown[]) {
      if (!panoramas.length) {
        return
      }

      if (isShowPanorama) {
        new ymaps.panorama.Player('player', panoramas[0], {
          options: {
            width: '100%',
            height: '100%',
          },
          direction: 'auto',
          controls: ['zoomControl'],
          suppressMapOpenBlock: true,
        })

        return
      }

      checkPanorama?.(true)
    },
    function () {
      checkPanorama?.(false)
    },
  )

  return null
}

export const ApartmentPanorama = withYMaps(PanoramaComponent, true, [
  'panorama.isSupported',
  'panorama.locate',
  'panorama.Player',
])
