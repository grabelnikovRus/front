import { VFC } from 'react'

import { SvgBag, SvgArrows, SvgEscort, SvgValueApartment } from '@/uikit/svg'

import styles from './sell-service-card.module.scss'

export interface SellServiceCardProps {
  title: string
  icon: string
}

export const SellServiceCard: VFC<SellServiceCardProps> = ({ title, icon }) => (
  <div className={styles.service_card}>
    <span className={styles.service_card_icon}>
      {icon === 'arrows' && <SvgArrows />}
      {icon === 'bag' && <SvgBag />}
      {icon === 'escort' && <SvgEscort />}
      {icon === 'valueApartment' && <SvgValueApartment />}
    </span>
    <div dangerouslySetInnerHTML={{ __html: title }} className={styles.service_card_title} />
  </div>
)
