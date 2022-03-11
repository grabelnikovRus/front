import cn from 'classnames'
import { ReactNode, VFC } from 'react'

import styles from './service-card-container.module.scss'

export interface ServiceCardContainerProps {
  col?: number
  isChangeGridBehavior?: boolean
  children: ReactNode
}

export const ServiceCardContainer: VFC<ServiceCardContainerProps> = ({
  children,
  col = 3,
  isChangeGridBehavior = false,
}) => {
  const type = col === 3 ? 'container_col_3' : col === 2 ? 'container_col_2' : 'container_col_4'

  return (
    <div
      className={cn(styles[type], {
        [styles[`${type}--change-grid-behavior`]]: isChangeGridBehavior,
      })}
    >
      {children}
    </div>
  )
}
