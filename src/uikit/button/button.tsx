import cn from 'classnames'
import { VFC } from 'react'

import { ButtonBase, ButtonBaseProps } from '@/uikit/button-base/button-base'

import styles from './button.module.scss'

export type ButtonProps = ButtonBaseProps & {
  mode?: 'primary' | 'secondary' | 'back'
  size?: 'small' | 'medium' | 'large' | 'full'
  label?: string // todo: replace this prop with children
  externalStyles?: string // todo: rename this to className
}

export const Button: VFC<ButtonProps> = ({
  mode = 'primary',
  size = 'full',
  label,
  externalStyles,
  children,
  ...props
}) => {
  const buttonClassName = cn(
    styles.button,
    {
      [styles.button___primary]: mode === 'primary',
      [styles.button___secondary]: mode === 'secondary',
      [styles.button___back]: mode === 'back',
      [styles.button___small]: size === 'small',
      [styles.button___medium]: size === 'medium',
      [styles.button___large]: size === 'large',
      [styles.button___full]: size === 'full',
    },
    externalStyles,
  )
  return (
    <ButtonBase className={buttonClassName} {...props}>
      <span>{children || label}</span>
    </ButtonBase>
  )
}
