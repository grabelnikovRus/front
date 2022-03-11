import cn from 'classnames'
import { InputHTMLAttributes, ReactNode, VFC } from 'react'

import styles from './checkbox.module.scss'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode
  theme?: 'dark'
}

export const Checkbox: VFC<CheckboxProps> = ({ label, theme, ...rest }) => {
  const checkboxClassName = cn(styles.checkbox, {
    [styles.checkbox___dark]: theme === 'dark',
  })

  const id = rest.name

  return (
    <div className={checkboxClassName}>
      <input
        className={cn(styles.checkbox_input)}
        id={id}
        type="checkbox"
        data-testid={id}
        {...rest}
      />
      <label htmlFor={id} className={styles.checkbox_label}>
        <span>{label}</span>
      </label>
    </div>
  )
}
