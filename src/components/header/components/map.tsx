/* eslint-disable no-use-before-define */

import { useEffect, useRef, VFC } from 'react'

import constants from '@/legacy/config/constants.json'
import locationStyles from '@/legacy/styles/location.module.scss'
import { encodeToDataUri, interpolate } from '@/lib/string'
import { trackEvent } from '@/lib/tracking'
import { ContactsEntity } from '@/modules/contacts'

const MAP_POINT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cg filter='url(%23a)'%3E%3Ccircle cx='12' cy='8' r='8' fill='%2311142D'/%3E%3Ccircle cx='12' cy='8' r='7.25' stroke='%23fff' stroke-width='1.5'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='a' width='24' height='24' x='0' y='0' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend in2='BackgroundImageFix' result='effect1_dropShadow_22297:87447'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow_22297:87447' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E"
const MAP_POINT_ACTIVE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 30 30'%3E%3Cg filter='url(%23a)'%3E%3Ccircle cx='15' cy='11' r='11' fill='%234895EB'/%3E%3Ccircle cx='15' cy='11' r='10.25' stroke='%23fff' stroke-width='1.5'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='a' width='30' height='30' x='0' y='0' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend in2='BackgroundImageFix' result='effect1_dropShadow_22297:87472'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow_22297:87472' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E"

let globalMap: ymaps.Map | null = null

interface MapProps {
  active?: number | null
  data: ContactsEntity['cities']
  open: boolean
  selectMapObject?: (index: number, animation: boolean) => void
  tab?: number
}

export const Map: VFC<MapProps> = (props) => {
  const mapContainer = useRef<HTMLDivElement>(null)

  const addMarkers = async (newMap: ymaps.Map) =>
    props.data
      .filter((city) => city.latitude !== null && city.longitude !== null)
      .map((city) => {
        const balloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
          `<div class="my-custom-balloon">
                <img alt="" draggable="false" src="${MAP_POINT_ACTIVE}" />
                <span>{{properties.object}}</span>
              </div>`,
        )
        const newMarker = new window.ymaps.Placemark(
          [city.latitude, city.longitude],
          {
            id: city.id,
            hideIcon: false,
            hideIconOnBalloonOpen: false,
            object: city.name,
          },
          {
            balloonContentLayout: balloonContentLayout,
            hideIconOnBalloonOpen: false,
            iconImageHref: props.active === city.id ? MAP_POINT_ACTIVE : MAP_POINT,
            iconImageSize: props.active === city.id ? [40, 40] : [30, 30],
            iconImageOffset: props.active === city.id ? [-20, -20] : [-15, -15],
            iconLayout: 'default#image',
            zIndex: props.active === city.id ? 800 : 300,
          },
        )

        newMap.geoObjects.add(newMarker)
        newMarker.events.add('click', () => {
          clearMarkers()
          if (props.selectMapObject) {
            // @ts-ignore wrong typings in @types/yandex-maps, "id" definitely has number type, not object
            props.selectMapObject(newMarker.properties.get('id'), true)
          }
          newMarker.options.set('iconImageHref', MAP_POINT_ACTIVE)
          newMarker.options.set('iconImageOffset', [-20, -20])
          newMarker.options.set('iconImageSize', [40, 40])

          trackEvent({
            category: 'MAP',
            label: 'Name of the City on the Map',
            name: 'Clicked on the Name of the City on the Map',
          })
        })

        return newMap.geoObjects
      })

  const clearMarkers = () => {
    if (globalMap) {
      globalMap.geoObjects.each((marker) => {
        if (
          marker instanceof window.ymaps.Placemark &&
          // @ts-ignore wrong typings in @types/yandex-maps, "iconImageSize" definitely has number[] type, not object
          marker.options.get('iconImageSize')[0] > 30
        ) {
          marker.balloon.close()
          marker.options.set('iconImageHref', MAP_POINT)
          marker.options.set('iconImageOffset', [-15, -15])
          marker.options.set('iconImageSize', [30, 30])
          marker.options.set('zIndex', 300)
        }
      })
    }
  }

  const destroyMap = () => {
    const { current } = mapContainer

    if (globalMap) globalMap?.destroy()
    if (current) current.querySelector('ymaps')?.remove()
    globalMap = null
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const init = () => {
    if (!globalMap) {
      const timeoutId = window.setTimeout(async () => {
        const newMap = new window.ymaps.Map('map', {
          center: [55.75, 37.61],
          zoom: 7,
        })

        if (window.innerWidth >= 768) {
          // based on .location__content_aside styles from ./location.module.scss
          let zoneWidth: number
          if (window.innerWidth <= 991) zoneWidth = 406
          else if (window.innerWidth <= 1278 && window.innerWidth > 991) zoneWidth = 460
          else if (window.innerWidth <= 1439 && window.innerWidth > 1278) zoneWidth = 531
          else if (window.innerWidth <= 1919 && window.innerWidth > 1439) zoneWidth = 607
          else zoneWidth = 654 /* window.innerWidth > 1919 */

          newMap.margin.addArea({
            left: 0,
            top: 0,
            bottom: 0,
            width: zoneWidth,
            height: '100%',
          })
        }

        newMap.controls.remove('fullscreenControl')
        newMap.controls.remove('geolocationControl')
        newMap.controls.remove('rulerControl')
        newMap.controls.remove('searchControl')
        newMap.controls.remove('trafficControl')
        newMap.controls.remove('typeSelector')
        newMap.behaviors.disable(['scrollZoom'])
        newMap.container.fitToViewport()

        const markers = await addMarkers(newMap)

        if (markers) {
          newMap.setBounds(newMap.geoObjects.getBounds() ?? [], {
            checkZoomRange: true,
            zoomMargin: [10, 10, 30, 10],
          })
        }
        globalMap = newMap
        updateMarkers()
        window.clearTimeout(timeoutId)
      }, 1000)
    } else if (globalMap && !props.open) {
      destroyMap()
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateMarkers = () => {
    if (globalMap) {
      clearMarkers()

      globalMap.geoObjects.each((marker) => {
        if (
          marker instanceof window.ymaps.Placemark &&
          // @ts-ignore wrong typings in @types/yandex-maps, "id" definitely has number type, not object
          marker.properties.get('id') === props.active
        ) {
          marker.options.set('iconImageHref', MAP_POINT_ACTIVE)
          marker.options.set('iconImageOffset', [-20, -20])
          marker.options.set('iconImageSize', [40, 40])
          marker.options.set('zIndex', 800)
          marker.balloon.open()
        }
      })

      if (globalMap) {
        globalMap.setBounds(globalMap.geoObjects.getBounds() ?? [], {
          checkZoomRange: true,
          zoomMargin: [10, 10, 30, 10],
          useMapMargin: true,
        })
      }
    }
  }

  useEffect(() => {
    if (window?.ymaps && props.open) {
      if (props.tab === 1 || window.innerWidth >= 768) window.ymaps?.ready(init)
      else destroyMap()
    } else destroyMap()
  }, [init, props.open, props.tab])

  useEffect(() => updateMarkers(), [props.active, props.tab, updateMarkers])

  return (
    <div
      className={locationStyles.mapBox}
      style={{
        backgroundImage: `url(${encodeToDataUri(
          interpolate(constants.SITE.PRELOADER, { color: '#fff' }),
        )})`,
      }}
    >
      <div className={locationStyles.myMap} id="map" ref={mapContainer} />
    </div>
  )
}
