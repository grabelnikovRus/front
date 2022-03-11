import cn from 'classnames'
import { ChangeEvent, VFC } from 'react'

import {
  SvgCosmeticCian,
  SvgDesignCian,
  SvgEuroCian,
  SvgNoCian,
  SvgNoDecoration,
} from '@/uikit/svg'

import styles from './checkbox-circular.module.scss'

export interface CheckboxCircularProps {
  name: string
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  icon: string | null
  theme?: 'opaque' | 'classic'
  showIcon?: boolean
  checked: boolean
  layout: string
  error?: string
}

export const CheckboxCircular: VFC<CheckboxCircularProps> = ({
  name,
  label,
  onChange,
  icon,
  theme = 'opaque',
  checked = false,
  layout = 'row',
  error,
}) => {
  const checkboxClassName = cn(styles.checkbox_circular, {
    [styles.checkbox_circular___opaque]: theme === 'opaque',
    [styles.checkbox_circular___with_icon]: layout === 'column' && theme !== 'classic',
    [styles.classic]: theme === 'classic',
  })

  const id = name

  return (
    <div className={checkboxClassName}>
      <input
        id={id}
        className={styles.checkbox_circular_input}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <label
        htmlFor={id}
        className={cn(styles.checkbox_circular_label, {
          [styles.checkbox_circular_label___error]: error,
        })}
      >
        {layout === 'column' && theme !== 'classic' && (
          <div className={styles.checkbox_circular_icon_area}>
            <div className={styles.checkbox_circular_icon}>
              {icon === null && <SvgNoDecoration />}
              {icon === 'noCian' && <SvgNoCian />}
              {icon === 'cosmeticCian' && <SvgCosmeticCian />}
              {icon === 'designCian' && <SvgDesignCian />}
              {icon === 'euroCian' && <SvgEuroCian />}
            </div>
          </div>
        )}
        <span>{label}</span>
      </label>
    </div>
  )
}
