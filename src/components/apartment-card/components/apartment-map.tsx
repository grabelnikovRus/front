import cn from 'classnames'
import { VFC, useState, useRef, useCallback } from 'react'
import { Map, Placemark, YMapsApi } from 'react-yandex-maps'

import { useMediaSmallScreen } from '@/lib/use-media'
import { ApartmentEntity } from '@/modules/apartment'

import styles from './apartment-map.module.scss'
import Pin from './pin.svg'

const DEFAULT_OPTIONS = {
  yandexMapDisablePoiInteractivity: true,
  suppressMapOpenBlock: true,
  maxAnimationZoomDifference: 20,
  minZoom: 5,
}

interface ApartmentMapProps {
  address: ApartmentEntity['address']
  size?: string
}

export const ApartmentMap: VFC<ApartmentMapProps> = ({ address, size }) => {
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null)
  const mapRef = useRef<ymaps.Map | null>(null)
  const coordinates = [address.point.longitude, address.point.latitude]
  const isSmallScreen = useMediaSmallScreen()

  const DEFAULT_STATE = {
    center: coordinates,
    zoom: 16,
    controls: [],
  }

  const setInitialRef = useCallback(
    (ref: ymaps.Map | null) => {
      mapRef.current = ref
      if (ymaps) {
        const zoomControl = new ymaps.control.ZoomControl({
          options: {
            size: 'small',
            position: {
              bottom: 16,
              left: 10,
            },
          },
        })

        if (size === 'full' || !isSmallScreen) {
          mapRef.current?.controls.add(zoomControl)
        }
      }
    },
    [ymaps], // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={cn(styles.map, { [styles.map__full]: size === 'full' })}>
      <Map
        onLoad={(ymaps: YMapsApi) => setYmaps(ymaps)}
        defaultOptions={DEFAULT_OPTIONS}
        defaultState={DEFAULT_STATE}
        instanceRef={setInitialRef}
        width="100%"
        height="100%"
      >
        <Placemark
          geometry={coordinates}
          options={{
            iconLayout: 'default#image',
            iconImageHref: Pin,
            iconImageSize: [27, 32],
            iconImageOffset: [-13.5, -32],
          }}
        />
      </Map>
    </div>
  )
}
