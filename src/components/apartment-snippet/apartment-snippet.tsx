import cn from 'classnames'
import { useState, VFC } from 'react'

import { Apartment } from '@/api'
import { SignUpViewing } from '@/components/sign-up-viewing/sign-up-viewing'
import { SliderImages } from '@/components/slider-images/slider-images'
import { LOCKED_APARTMENT_AMO_ID } from '@/config'
import { formatToPercent } from '@/lib/number'
import { share } from '@/lib/share'
import { trackEvent, categoryForAnalytic } from '@/lib/tracking'
import { WidgetFields } from '@/modules/widgets'
import { Badge, FormattingNumbers, SvgCopy, DottedRow, SvgCar, SvgWalk, SvgBus } from '@/uikit'
import { BannerApartmentSnippet } from '@/widgets/banner-apartment-snippet/banner-apartment-snippet'

import styles from './apartment-snippet.module.scss'

export interface ApartmentSnippetProps {
  apartment: Apartment
  contactPhoneNumber?: string
  bannerApartmentSnippet?: WidgetFields
  bannerModal?: WidgetFields
  placement?: 'default' | 'map' | 'similar'
}

export const ApartmentSnippet: VFC<ApartmentSnippetProps> = ({
  apartment: {
    amoId,
    priceRub,
    roominess,
    fullArea,
    floorNumber,
    buildingFloorCount,
    housingType,
    housingComplex,
    address,
    subwayStations,
    images,
    loanRate,
    discountRate,
  },
  contactPhoneNumber,
  bannerApartmentSnippet,
  bannerModal,
  placement = 'default',
}) => {
  const [isActiveCopy, setIsActiveCopy] = useState(false)
  const isNewApartment = housingType?.slug === 'newbuilding'
  const isShowBlock = amoId !== LOCKED_APARTMENT_AMO_ID

  const onClickCopy = () => {
    setIsActiveCopy(true)
    share(housingComplex?.name || 'Квартира', `/apartment/${amoId}`)
    setTimeout(() => setIsActiveCopy(false), 2500)
    const label = `Copy Link${placement === 'similar' ? ' to similar apartments' : ''}`
    const name = `Clicked on Copy Link${placement === 'similar' ? ' to similar apartments' : ''}`

    trackEvent({
      category: categoryForAnalytic(location.pathname, 'Funnel '),
      label,
      name,
    })
  }

  const indexMainPhoto = images.findIndex((image) => image.isMain)
  const mainPhoto = images[indexMainPhoto]
  const sortImages =
    images.length > 0
      ? [
          mainPhoto,
          ...images.slice(0, indexMainPhoto),
          ...images.slice(indexMainPhoto + 1, images.length),
        ]
      : []

  return (
    <article
      className={cn(styles.apartment_snippet, {
        [styles.apartment_snippet___only_mobile]: placement === 'map',
      })}
    >
      <div className={styles.apartment_snippet_inform}>
        <div className={styles.apartment_snippet_slider}>
          <SliderImages
            images={sortImages}
            link={'/apartment/' + amoId}
            onAnalyticEvent={(type) => {
              const label =
                type === 'arrow' ? 'Slider buttons' : 'View Apartment on the Catalog Page'
              const name =
                type === 'arrow'
                  ? 'Clicked on the Slider buttons'
                  : 'Clicked on View Apartment on the Catalog Page'

              trackEvent({
                category: categoryForAnalytic(location.pathname, 'Funnel '),
                label: placement === 'similar' ? `${label} to similar apartments` : label,
                name: placement === 'similar' ? `${name} to similar apartments` : name,
              })
            }}
          />
          <button
            className={cn(styles.apartment_snippet_copy, {
              [styles.apartment_snippet_copy___active]: isActiveCopy,
            })}
            onClick={onClickCopy}
          >
            {!isActiveCopy && <SvgCopy />}
          </button>
        </div>
        <span className={styles.apartment_snippet_code}>{`Артикул ${amoId}`}</span>
        <a
          className={styles.apartment_snippet_price}
          draggable="false"
          href={'/apartment/' + amoId}
          target="_blank"
          rel="noreferrer"
        >
          <FormattingNumbers mode="money" value={priceRub} />
          <span className={styles.apartment_snippet_sub_price}>
            <FormattingNumbers value={(priceRub * 100) / fullArea} mode="money" />
            /м²
          </span>
        </a>
        <div className={styles.badges}>
          {housingType !== null && <Badge>{isNewApartment ? 'Первичка' : 'Вторичка'}</Badge>}
          {isShowBlock && loanRate !== null && <Badge>Ипотека {formatToPercent(loanRate)}</Badge>}
          {isShowBlock && discountRate !== null && (
            <Badge>Скидка {formatToPercent(discountRate)}</Badge>
          )}
        </div>
        <ul className={cn(styles.list, { [styles.list___only_mobile]: placement === 'map' })}>
          <li className={styles.list_item}>
            {roominess.isStudio ? 'Студия' : `${roominess.count}-комн.`}
          </li>
          <li className={styles.list_item}>
            <DottedRow />
            <FormattingNumbers value={fullArea / 100} mode="area" />
          </li>
          <li className={styles.list_item}>
            <DottedRow />
            {`${floorNumber}/${buildingFloorCount} этаж`}
          </li>
        </ul>
        <div
          className={cn(styles.buttons, { [styles.buttons___only_mobile]: placement === 'map' })}
        >
          {contactPhoneNumber !== undefined && (
            <a
              href={`tel:${contactPhoneNumber}`}
              className={styles.buttons_phone}
              onClick={() => {
                const category = categoryForAnalytic(location.pathname, 'Funnel ')
                const label = `Phone${placement === 'similar' ? ' to similar apartments' : ''}`
                const name = `Clicked on the Phone${
                  placement === 'similar' ? ' to similar apartments' : ''
                }`

                trackEvent({
                  category,
                  label,
                  name,
                })
              }}
            >
              <FormattingNumbers mode="phone" value={contactPhoneNumber} />
            </a>
          )}
          <SignUpViewing amoId={amoId} bannerModal={bannerModal} placement={placement} />
        </div>
        <span className={styles.apartment_snippet_address}>
          {housingComplex !== null && <span>{`${housingComplex.name}, `}</span>}
          {address.formatted}
        </span>
        {Boolean(subwayStations[0]?.station.displayName) && (
          <div
            className={cn(styles.subway, { [styles.subway___only_mobile]: placement === 'map' })}
          >
            <div className={styles.subway_station}>
              {subwayStations[0]?.station.displayName.replace(/([м|М]етро\s?)/gm, '')}
            </div>
            <div className={styles.subway_travel}>
              <DottedRow />
              <div className={styles.subway_time}>
                {subwayStations[0].travel?.slug === 'walk' && <SvgWalk />}
                {subwayStations[0].travel?.slug === 'car' && <SvgCar />}
                {subwayStations[0].travel?.slug === 'public_transport' && <SvgBus />}
                <span>{`${subwayStations[0].travelTimeToStation} мин`}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {isShowBlock && bannerApartmentSnippet && (
        <div className={styles.apartment_snippet_banner}>
          <BannerApartmentSnippet
            fields={bannerApartmentSnippet}
            onAnalyticEvent={() => {
              const category = categoryForAnalytic(location.pathname, 'Funnel ')
              const label = `Discount${placement === 'similar' ? ' for Similar Apartments' : ''}`
              const name = `Clicked on Discount${
                placement === 'similar' ? ' for Similar Apartments' : ''
              }`

              trackEvent({
                category,
                label,
                name,
              })
            }}
          />
        </div>
      )}
    </article>
  )
}
