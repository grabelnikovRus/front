import cn from 'classnames'
import { HTMLAttributes, ReactNode, VFC } from 'react'

import classes from './label.module.scss'

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  screenReadersOnly?: boolean
  children: ReactNode
}

export const Label: VFC<LabelProps> = ({ screenReadersOnly = false, children, ...props }) => {
  const rootClasses = cn(classes.label, props.className, {
    [classes.label_sr_only]: screenReadersOnly,
  })

  return (
    <label {...props} className={rootClasses}>
      {children}
    </label>
  )
}
