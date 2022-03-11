import { ReactNode } from 'react'

import {
  SvgClockConditions,
  SvgSofa,
  SvgShieldGrad,
  SvgPercentConditions,
  SvgKeyLegalPurity,
  SvgPerson,
} from '@/uikit'

import styles from './legal-purity.module.scss'

export const getIcon = (value: string | null): ReactNode => {
  switch (value) {
    case 'clock':
      return <SvgClockConditions />
    case 'sofa':
      return <SvgSofa />
    case 'shield':
      return <SvgShieldGrad className={styles.shield} />
    case 'percent':
      return <SvgPercentConditions className={styles.percent} />
    case 'key':
      return <SvgKeyLegalPurity />
    case 'person':
      return <SvgPerson />
    default:
      return null
  }
}
