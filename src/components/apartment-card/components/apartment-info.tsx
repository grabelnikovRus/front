import { VFC, useState } from 'react'

import { pluralizeCardinal } from '@/lib/i18n'
import { trackEvent } from '@/lib/tracking'
import { ApartmentEntity } from '@/modules/apartment'
import {
  Button,
  FormattingNumbers,
  SvgCombinedWcs,
  SvgCooker,
  SvgDrop,
  SvgHeight,
  SvgRedevelopment,
  SvgRepair,
  SvgTrash,
  SvgWindow,
  SvgBalcony,
  SvgEntrance,
  SvgYearBuilding,
  Switcher,
  SvgParking,
  SvgPassengerElevator,
  SvgElevator,
  SvgHeating,
} from '@/uikit'

import styles from './apartment-info.module.scss'
import { useLightBox } from './use-light-box'

export interface ApartmentInfoProps extends ApartmentEntity {
  indexPlan: number
}

export const ApartmentInfo: VFC<ApartmentInfoProps> = (props) => {
  const [value, setValue] = useState<'apartment' | 'house'>('apartment')

  const {
    roominess,
    indexPlan,
    fullArea,
    livingArea,
    kitchensArea,
    bedroomsArea,
    separateWcsCount,
    combinedWcsCount,
    windowViewType,
    buildingCeilingHeight,
    decorationType,
    stoveType,
    balconiesCount,
    isRedevelopment,
    isBuildingHasGarbageChute,
    buildingPorchsCount,
    buildingConstructionYear,
    buildingParkingType,
    buildingPassengerElevatorsCount,
    buildingFreightElevatorsCount,
    heatingType,
  } = props

  const { openLightbox } = useLightBox()

  let roomsArea = bedroomsArea ?? bedroomsArea
  if (roominess.count === 1 || roominess.isStudio) {
    roomsArea = livingArea ?? livingArea
  }

  return (
    <div className={styles.info}>
      <div className={styles.info_options}>
        <Switcher
          buttons={[
            {
              mode: 'button',
              callback: () => {
                setValue('apartment')
                trackEvent({
                  category: 'Funnel Apartments',
                  name: 'Clicked on an Apartment',
                  label: 'Apartment',
                })
              },
              text: 'О квартире',
              slug: 'apartment',
            },
            {
              mode: 'button',
              callback: () => {
                setValue('house')
                trackEvent({
                  category: 'Funnel Apartments',
                  name: 'Clicked on the House',
                  label: 'House',
                })
              },
              text: 'О доме',
              slug: 'house',
            },
          ]}
        />
        <ul className={styles.info_list}>
          {value === 'apartment' && (
            <>
              <li className={styles.info_item}>
                <span className={styles.info_text}>
                  {combinedWcsCount === 0 && 'Нет совмещенного санузла'}
                  {combinedWcsCount === 1 && 'Совмещенный санузел'}
                  {combinedWcsCount > 1 && `${combinedWcsCount} совмещенных санузла`}
                </span>
                <SvgCombinedWcs />
              </li>
              <li className={styles.info_item}>
                <span className={styles.info_text}>
                  {separateWcsCount === 0 && 'Нет раздельного санузла'}
                  {separateWcsCount === 1 && 'Раздельный санузел'}
                  {separateWcsCount > 1 && `${separateWcsCount} раздельныx санузла`}
                </span>
                <SvgDrop />
              </li>
              {windowViewType !== null && (
                <li className={styles.info_item}>
                  <span
                    className={styles.info_text}
                  >{`Окна ${windowViewType.altTitle?.toLowerCase()}`}</span>
                  <SvgWindow />
                </li>
              )}
              {buildingCeilingHeight !== null && (
                <li className={styles.info_item}>
                  <span className={styles.info_text}>{`Потолки ${(buildingCeilingHeight / 100)
                    .toString()
                    .replace('.', ',')} метра`}</span>
                  <SvgHeight />
                </li>
              )}
              {decorationType !== null && (
                <li className={styles.info_item}>
                  <span className={styles.info_text}>{`${decorationType.altTitle} ${
                    decorationType.altTitle !== 'Без ремонта' ? 'ремонт' : ''
                  }`}</span>
                  <SvgRepair />
                </li>
              )}
              {stoveType !== null && (
                <li className={styles.info_item}>
                  <span className={styles.info_text}>{`${stoveType.altTitle} плита`}</span>
                  <SvgCooker />
                </li>
              )}
              <li className={styles.info_item}>
                <span className={styles.info_text}>
                  {isRedevelopment === null || !isRedevelopment
                    ? 'Нет перепланировки'
                    : 'Перепланировка'}
                </span>
                <SvgRedevelopment />
              </li>
              <li className={styles.info_item}>
                <span className={styles.info_text}>
                  {balconiesCount === 0 && 'Нет балкона'}
                  {balconiesCount === 1 && 'Балкон'}
                  {balconiesCount > 1 && `${balconiesCount} Балкона`}
                </span>
                <SvgBalcony />
              </li>
            </>
          )}
          {value === 'house' && (
            <>
              {isBuildingHasGarbageChute !== null && (
                <li className={styles.info_item}>
                  <span className={styles.info_text}>
                    {isBuildingHasGarbageChute && 'Есть мусоропровод'}
                    {!isBuildingHasGarbageChute && 'Нет мусоропровода'}
                  </span>
                  <SvgTrash />
                </li>
              )}
              {buildingPorchsCount !== null && (
                <li className={styles.info_item}>
                  <span className={styles.info_text}>
                    {pluralizeCardinal(buildingPorchsCount, ['подъездов', 'подъезд', 'подъезда'])}
                  </span>
                  <SvgEntrance />
                </li>
              )}
              <li className={styles.info_item}>
                <span className={styles.info_text}>{`${
                  buildingConstructionYear > new Date().getFullYear()
                    ? 'Будет построен'
                    : 'Построен'
                } в ${buildingConstructionYear} г.`}</span>
                <SvgYearBuilding />
              </li>
              {buildingParkingType !== null && (
                <li className={styles.info_item}>
                  <span
                    className={styles.info_text}
                  >{`${buildingParkingType.altTitle} парковка`}</span>
                  <SvgParking />
                </li>
              )}
              {buildingPassengerElevatorsCount !== null && (
                <li className={styles.info_item}>
                  <span className={styles.info_text}>
                    {buildingPassengerElevatorsCount === 0 && 'Нет пассажирского лифта'}
                    {buildingPassengerElevatorsCount === 1 && 'Пассажирский лифт'}
                    {buildingPassengerElevatorsCount > 1 &&
                      `${buildingPassengerElevatorsCount} пассажирских лифта`}
                  </span>
                  <SvgPassengerElevator />
                </li>
              )}
              {buildingFreightElevatorsCount !== null && (
                <li className={styles.info_item}>
                  <span className={styles.info_text}>
                    {buildingFreightElevatorsCount === 0 && 'Нет грузового лифта'}
                    {buildingFreightElevatorsCount === 1 && 'Грузовой лифт'}
                    {buildingFreightElevatorsCount > 1 &&
                      `${buildingFreightElevatorsCount} грузовых лифта`}
                  </span>
                  <SvgElevator />
                </li>
              )}
              {heatingType !== null && (
                <li className={styles.info_item}>
                  <span className={styles.info_text}>{`${heatingType.altTitle} отопление`}</span>
                  <SvgHeating />
                </li>
              )}
            </>
          )}
        </ul>
      </div>
      <div className={styles.area}>
        <span className={styles.area_title}>Площадь</span>
        <div className={styles.area_table}>
          <div className={styles.area_cell}>
            <span className={styles.area_value}>
              <FormattingNumbers value={fullArea / 100} mode="area" />
            </span>
            <span className={styles.area_text}>Общая</span>
          </div>
          {livingArea !== null && livingArea !== 0 && (
            <div className={styles.area_cell}>
              <span className={styles.area_value}>
                <FormattingNumbers value={livingArea / 100} mode="area" />
              </span>
              <span className={styles.area_text}>Жилая</span>
            </div>
          )}
          {kitchensArea !== null && kitchensArea !== 0 && (
            <div className={styles.area_cell}>
              <span className={styles.area_value}>
                <FormattingNumbers value={kitchensArea / 100} mode="area" />
              </span>
              <span className={styles.area_text}>Кухня</span>
            </div>
          )}
          {roomsArea !== null && (
            <div className={styles.area_cell}>
              <span className={styles.area_value}>
                <FormattingNumbers value={roomsArea / 100} mode="area" />
              </span>
              <span className={styles.area_text}>
                {pluralizeCardinal(
                  roominess.count === 1 || roominess.isStudio ? 1 : 2,
                  ['Комнат', 'Комната', 'Комнаты'],
                  false,
                )}
              </span>
            </div>
          )}
        </div>
        {indexPlan >= 0 && (
          <Button
            onClick={() => {
              openLightbox(indexPlan + 1)
              trackEvent({
                category: 'Funnel Apartments',
                name: 'Clicked View floor plan',
                label: 'View floor plan',
              })
            }}
            className={styles.area_btn}
          >
            Смотреть планировку
          </Button>
        )}
      </div>
    </div>
  )
}
