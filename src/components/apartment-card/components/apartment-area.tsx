import cn from 'classnames'
import { VFC } from 'react'

import { ApartmentReference, ApartmentWithAmoHistoryStatusLabelEnum } from '@/api'
import { ApartmentEntity } from '@/modules/apartment'
import {
  DottedRow,
  SvgCar,
  SvgWalk,
  SvgBus,
  SvgPik,
  SvgA101,
  SvgLevel,
  SvgIngrad,
  SvgSamolet,
} from '@/uikit'

import styles from './apartment-area.module.scss'
import { ApartmentMapSwitch } from './apartment-map-switch'

const hasDeveloper = (developer: ApartmentReference | null): developer is ApartmentReference =>
  developer?.slug != null &&
  ['gk-pik', 'a101', 'level-group', 'ingrad', 'samolet'].includes(developer.slug)

export const ApartmentArea: VFC<ApartmentEntity> = (props) => {
  const { address, housingComplex, subwayStations, buildingDeveloper, statusLabel } = props

  return (
    <article
      className={cn(styles.area, {
        [styles.area___without_map]:
          statusLabel === ApartmentWithAmoHistoryStatusLabelEnum.Unlisted,
      })}
    >
      <div className={styles.area_inform}>
        <div className={styles.area_title}>Адрес</div>
        {(hasDeveloper(buildingDeveloper) || housingComplex !== null) && (
          <div className={styles.developer}>
            {hasDeveloper(buildingDeveloper) && (
              <div className={styles.developer_icon}>
                {buildingDeveloper.slug === 'gk-pik' && <SvgPik />}
                {buildingDeveloper.slug === 'a101' && <SvgA101 />}
                {buildingDeveloper.slug === 'level-group' && <SvgLevel />}
                {buildingDeveloper.slug === 'ingrad' && <SvgIngrad />}
                {buildingDeveloper.slug === 'samolet' && <SvgSamolet />}
              </div>
            )}
            {housingComplex !== null && (
              <div className={styles.developer_complex}>{housingComplex?.name}</div>
            )}
          </div>
        )}
        <div className={styles.area_address}>{address.formatted}</div>
        <div className={styles.area_subway_stations}>
          {subwayStations.map((station) => (
            <div className={styles.subway} key={station.station.displayName}>
              <div className={styles.subway_station}>
                {station.station.displayName.replace(/([м|М]етро\s?)/gm, '')}
              </div>
              <div className={styles.subway_travel}>
                <DottedRow />
                <div className={styles.subway_time}>
                  {station.travel?.slug === 'walk' && <SvgWalk />}
                  {station.travel?.slug === 'car' && <SvgCar />}
                  {station.travel?.slug === 'public_transport' && <SvgBus />}
                  <span>{`${station.travelTimeToStation} мин`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {statusLabel !== ApartmentWithAmoHistoryStatusLabelEnum.Unlisted && (
        <ApartmentMapSwitch {...props.address} />
      )}
    </article>
  )
}
