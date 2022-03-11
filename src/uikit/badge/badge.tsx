import cn from 'classnames'
import { VFC } from 'react'

import { ButtonBase, ButtonBaseProps } from '@/uikit/button-base/button-base'

import styles from './badge.module.scss'

export type BadgeProps = ButtonBaseProps & {
  mode?: 'default' | 'gradient' | 'blue'
  size?: 'auto' | 'full'
}

export const Badge: VFC<BadgeProps> = ({
  mode = 'blue',
  size = 'auto',
  children,
  className,
  ...props
}) => {
  const badgeClassName = cn(styles.badge, className, {
    [styles.badge___default]: mode === 'default',
    [styles.badge___gradient]: mode === 'gradient',
    [styles.badge___blue]: mode === 'blue',
    [styles.badge___full]: size === 'full',
  })

  return (
    <ButtonBase {...props} className={badgeClassName}>
      <span>{children}</span>
    </ButtonBase>
  )
}
