import { ReactNode } from 'react'

import { SvgClock, SvgKey, SvgWalletGrad, SvgTradeIn } from '@/uikit'

import styles from './exchange-apartment-slider.module.scss'

export const getIcon = (value: string): ReactNode => {
  switch (value) {
    case 'key':
      return <SvgKey className={styles.key} />
    case 'clock':
      return <SvgClock className={styles.clock} />
    case 'wallet':
      return <SvgWalletGrad />
    case 'reversal':
      return <SvgTradeIn />
    default:
      return null
  }
}
