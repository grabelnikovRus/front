import {
  SvgFlower,
  SvgHouseGrad,
  SvgClockConditions,
  SvgPercentConditions,
  SvgShieldGrad,
  SvgListConditions,
  SvgSearch,
  SvgWalletGrad,
  SvgDiagramm,
  SvgSofa,
} from '@/uikit'

import styles from './conditions-list.module.scss'

export const getIcons = (key: string | null): JSX.Element | null => {
  switch (key) {
    case 'flower':
      return <SvgFlower />
    case 'house':
      return <SvgHouseGrad />
    case 'shield':
      return <SvgShieldGrad className={styles.shield} />
    case 'percent':
      return <SvgPercentConditions className={styles.percent} />
    case 'clock':
      return <SvgClockConditions />
    case 'list':
      return <SvgListConditions />
    case 'search':
      return <SvgSearch />
    case 'wallet':
      return <SvgWalletGrad />
    case 'diagram':
      return <SvgDiagramm />
    case 'sofa':
      return <SvgSofa />
    default:
      return null
  }
}
