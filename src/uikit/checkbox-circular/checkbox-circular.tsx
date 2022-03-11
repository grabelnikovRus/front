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
  checked: boolean
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  mode?: 'full_empty_space' | 'full'
  icon?: 'noCian' | 'cosmeticCian' | 'designCian' | 'euroCian' | null
  value: string
  theme?: 'catalogFilter' | 'simpleFilter' | 'indicatorButton'
}

export const CheckboxCircular: VFC<CheckboxCircularProps> = ({
  name,
  checked,
  label,
  onChange,
  mode,
  icon,
  value,
  theme = 'catalogFilter',
}) => {
  const labelClassName = cn(
    styles.checbox_circular_label,
    styles[`checbox_circular_label--${mode}`],
    {
      [styles[`checbox_circular_label--width_icon`]]: icon !== undefined,
      [styles.checbox_circular_label___simple_filter]: theme === 'simpleFilter',
      [styles.checbox_circular_label___indicator_button]: theme === 'indicatorButton',
    },
  )

  const id = `${name}-${value}`

  return (
    <>
      <input
        id={id}
        className={cn(styles.checbox_circular, {
          [styles.checbox_circular___simple_filter]: theme === 'simpleFilter',
          [styles.checbox_circular___indicator_button]: theme === 'indicatorButton',
        })}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
        data-testid={id}
      />
      <label htmlFor={id} className={labelClassName}>
        {icon !== undefined && (
          <div className={styles.checbox_circular_icon_area}>
            <div className={styles.checbox_circular_icon}>
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
    </>
  )
}
