import cn from 'classnames'
import { VFC } from 'react'

import { ApartmentWithAmoHistoryStatusLabelEnum } from '@/api'
import { formatToPercent } from '@/lib/number'
import { ApartmentEntity } from '@/modules/apartment'
import { FormattingNumbers, Badge, DottedRow } from '@/uikit'

import { ApartmentDisabledSale } from './apartment-disabled-sale'
import styles from './apartment-options.module.scss'

export interface ApartmentOptionsProps {
  apartment: ApartmentEntity
  isShowBlock?: boolean
}

export const ApartmentOptions: VFC<ApartmentOptionsProps> = ({
  apartment,
  isShowBlock = true,
}) => {
  const {
    amoId,
    priceRub,
    roominess,
    fullArea,
    floorNumber,
    buildingFloorCount,
    housingType,
    loanRate,
    discountRate,
    statusLabel,
  } = apartment

  const isNewApartment = housingType?.slug === 'newbuilding'

  return (
    <article
      className={cn(styles.options, {
        [styles.options___disabled_sale]:
          statusLabel === ApartmentWithAmoHistoryStatusLabelEnum.Unlisted,
      })}
    >
      <div className={styles.article}>{`Артикул ${amoId}`}</div>
      {statusLabel !== ApartmentWithAmoHistoryStatusLabelEnum.Unlisted && (
        <div className={styles.price}>
          <FormattingNumbers mode="money" value={priceRub} />
          <div className={styles.price___for_area}>
            <FormattingNumbers value={(priceRub * 100) / fullArea} mode="money" />
            /м²
          </div>
        </div>
      )}
      <div className={styles.list}>
        <div className={styles.list_item}>
          {roominess.isStudio ? 'Студия' : `${roominess.count}-комн.`}
        </div>
        <div className={styles.list_item}>
          <DottedRow className={styles.list_dot} />
          <FormattingNumbers value={fullArea / 100} mode="area" />
        </div>
        {statusLabel !== ApartmentWithAmoHistoryStatusLabelEnum.Unlisted && (
          <div className={cn(styles.list_item, styles.list_price)}>
            <DottedRow className={styles.list_dot} />
            <FormattingNumbers value={(priceRub * 100) / fullArea} mode="money" />
            /м²
          </div>
        )}
        <div className={cn(styles.list_item, styles.list_floor)}>
          <DottedRow className={styles.list_dot} />
          {`${floorNumber}/${buildingFloorCount} этаж`}
        </div>
      </div>
      <div className={styles.badges}>
        {housingType !== null && <Badge>{isNewApartment ? 'Первичка' : 'Вторичка'}</Badge>}
        {isShowBlock && statusLabel !== ApartmentWithAmoHistoryStatusLabelEnum.Unlisted && (
          <>
            <div className={styles.badges_price}>
              <Badge>
                <FormattingNumbers value={(priceRub * 100) / fullArea} mode="money" />
                /м²
              </Badge>
            </div>
            {loanRate !== null && <Badge>Ипотека {formatToPercent(loanRate)}</Badge>}
            {discountRate !== null && <Badge>Скидка {formatToPercent(discountRate)}</Badge>}
          </>
        )}
      </div>
      {isShowBlock && statusLabel === ApartmentWithAmoHistoryStatusLabelEnum.Unlisted && (
        <div className={styles.disabled_sale}>
          <ApartmentDisabledSale />
        </div>
      )}
    </article>
  )
}
