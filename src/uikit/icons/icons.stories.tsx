import type { Meta } from '@storybook/react'
import { VFC } from 'react'

import styles from './icons.module.scss'

import * as svg from '../svg'

export const Svg: VFC = () => (
  <div className={styles.grid}>
    {Object.entries(svg).map(([title, Icon]) => (
      <div className={styles.grid_item} key={title}>
        <div className={styles.grid_title}>{title}</div>
        <Icon className={styles.grid_svg} />
      </div>
    ))}
  </div>
)

export default {
  title: 'UiKit/Icons',
} as Meta
