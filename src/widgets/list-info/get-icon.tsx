import { ReactNode } from 'react'

import { SvgShield, SvgPercent, SvgHouseGrad, SvgClockGradGradient } from '@/uikit'

import styles from './list-info.module.scss'

export const getIcon = (value: string | null): ReactNode => {
  switch (value) {
    case 'shield':
      return <SvgShield className={styles.shield} />
    case 'percent':
      return <SvgPercent className={styles.percent} />
    case 'home':
      return <SvgHouseGrad />
    case 'clock':
      return <SvgClockGradGradient />
    default:
      return null
  }
}
