import cn from 'classnames'
import { VFC, ReactNode } from 'react'

import styles from './container.module.scss'

export interface ContainerProps {
  containerType?: 'full' | 'container' | 'mobile-full' | 'apartment'
  theme?: 'default' | 'light' | 'none'
  border?: 'top' | 'all' | 'none'
  children: ReactNode
}

export const Container: VFC<ContainerProps> = ({
  containerType = 'container',
  theme = 'none',
  border = 'none',
  children,
}) => {
  const containerClassName = cn(styles.container, {
    [styles.container___full]: containerType === 'full',
    [styles.container___container]: containerType === 'container',
    [styles.container___mobile_full]: containerType === 'mobile-full',
    [styles.container___apartment]: containerType === 'apartment',
    [styles.container___default]: theme === 'default',
    [styles.container___light]: theme === 'light',
    [styles.container___border_top]: border === 'top',
    [styles.container___border_all]: border === 'all',
  })

  return <div className={containerClassName}>{children}</div>
}
