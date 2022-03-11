import cn from 'classnames'
import { renderToString } from 'react-dom/server'
import { YMapsApi, ObjectManagerFeature } from 'react-yandex-maps'

import styles from '../maps.module.scss'

interface pinInfoProps {
  minPrice: number
  apartments: number
}

const Cluster = (pinInfo: pinInfoProps): JSX.Element => {
  const { minPrice, apartments } = pinInfo
  const badgePrice = `${(minPrice / 1000000).toFixed(1)} млн`

  return (
    <div className={styles.pin}>
      {apartments > 1 && (
        <span className={cn('placemark_number', styles.pin_number)}>{apartments}</span>
      )}
      {apartments > 1 ? 'от ' + badgePrice : badgePrice}
    </div>
  )
}

export const pinLayout = (
  ymaps: YMapsApi | null,
  centerMap: number[],
  isOpenList: boolean,
): ymaps.IClassConstructor<unknown> | null => {
  if (!ymaps) return null

  const placemark = `<div class="placemark"></div>`

  const animatedLayout = ymaps?.templateLayoutFactory.createClass(placemark, {
    build() {
      const data = this.getData().properties
      animatedLayout.superclass.build.call(this)
      const element = this.getParentElement().getElementsByClassName('placemark')[0]
      let pin = {
        minPrice: 0,
        apartments: 0,
      }
      let apartmentsCount
      const pinCoordinates = this.getData().geometry.coordinates
      const isActive =
        centerMap.every((el) => el === pinCoordinates[0] || el === pinCoordinates[1]) &&
        isOpenList

      isActive
        ? element.classList.add('placemark___active')
        : element.classList.remove('placemark___active')

      if ('pin' in data) {
        apartmentsCount = data.pin.apartments.length
        pin = {
          ...data.pin,
          apartments: apartmentsCount,
        }
      }

      if ('geoObjects' in data) {
        const pins = data.geoObjects.map((item: ObjectManagerFeature) => item.properties?.pin)
        const pinWidthMinPrce = pins.reduce((acc: pinInfoProps, curr: pinInfoProps) =>
          acc.minPrice > curr.minPrice ? acc : curr,
        )
        apartmentsCount = pins.map((item: pinInfoProps) => item.apartments).flat().length

        pin = {
          ...pinWidthMinPrce,
          apartments: apartmentsCount,
        }
      }

      let placemarkClass
      let coordinates = [
        [-34, -34],
        [34, -4],
      ]

      if (apartmentsCount > 1 && apartmentsCount < 10) {
        placemarkClass = 'placemark___1digit'
        coordinates = [
          [-56, -38],
          [56, -4],
        ]
      }

      if (apartmentsCount >= 10 && apartmentsCount < 100) {
        placemarkClass = 'placemark___2digit'
        coordinates = [
          [-60, -38],
          [60, -4],
        ]
      }

      if (apartmentsCount >= 100) {
        placemarkClass = 'placemark___3digit'
        coordinates = [
          [-66, -38],
          [66, -4],
        ]
      }

      if (placemarkClass) {
        element.classList.add(placemarkClass)
      }

      const shape = {
        type: 'Rectangle',
        coordinates,
      }

      this.getData().options.set('shape', shape)

      const html = renderToString(<Cluster {...pin} />)
      element.innerHTML = html
    },
  })

  return animatedLayout
}
