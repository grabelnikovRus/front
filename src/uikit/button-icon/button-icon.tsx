import cn from 'classnames'
import { ReactElement, VFC } from 'react'

import { ButtonBase, ButtonBaseProps } from '@/uikit/button-base/button-base'

import styles from './button-icon.module.scss'

export type ButtonIconProps = ButtonBaseProps & {
  mode?: 'transparent' | 'opaque'
  children: ReactElement
}

export const ButtonIcon: VFC<ButtonIconProps> = ({
  mode = 'transparent',
  className,
  children,
  ...props
}) => {
  const buttonClassName = cn(styles.button_icon, className, {
    [styles.button_icon___transparent]: mode === 'transparent',
    [styles.button_icon___opaque]: mode === 'opaque',
  })
  return (
    <ButtonBase className={buttonClassName} {...props}>
      {children}
    </ButtonBase>
  )
}
