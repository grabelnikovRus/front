import cn from 'classnames'
import { ChangeEvent, VFC } from 'react'

import { CatalogCheckboxGroupOptions } from '@/api'
import { CheckboxCircular } from '@/uikit/checkbox-circular/checkbox-circular'

import styles from './checkbox-group.module.scss'

export interface CheckboxGroupProps {
  name: string
  layout: 'row' | 'main' | 'wrap' | 'column'
  label?: string
  options?: CatalogCheckboxGroupOptions[]
  values: string[]
  required?: boolean
  _default?: string[] | null
  onChange: (event: ChangeEvent<HTMLInputElement>, values: string[]) => void
  className?: string
  changeStrategy?: 'default' | 'only-one'
  theme?: 'catalogFilter' | 'simpleFilter' | 'indicatorButton'
  onClick?: (value: string) => void
}

export const CheckboxGroup: VFC<CheckboxGroupProps> = ({
  name,
  label,
  layout = 'row',
  options = [],
  _default = null,
  values,
  onChange,
  className,
  changeStrategy = 'default',
  theme = 'catalogFilter',
  onClick,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = options[index]
    const { checked } = event.target
    let newArray: string[]

    if (value === null) {
      throw Error(`Unknown option value: "${value}"`)
    }

    onClick?.(value)

    // todo: make test for this logic
    if (changeStrategy === 'only-one') {
      if (checked) {
        newArray = [value]
      } else {
        if (_default === null) {
          newArray = options[0].value ? [options[0].value] : []
        } else {
          if (Array.isArray(_default) && _default.length === 1) {
            const [defaultValue] = _default
            newArray = [defaultValue]
          } else {
            throw Error(`Unknown default value: "${_default}"`)
          }
        }
      }
    } else if (_default === null) {
      if (checked) {
        newArray = [...values, value].sort()
      } else {
        newArray = values.filter((v) => v !== value)
      }
    } else {
      if (Array.isArray(_default) && _default.length === 1) {
        const [defaultValue] = _default
        if (value === defaultValue) {
          newArray = [defaultValue]
        } else {
          if (checked) {
            newArray = [...values, value].filter((v) => v !== defaultValue).sort()
          } else {
            newArray = values.filter((v) => v !== value)
          }
        }
      } else {
        throw Error(`Unknown default value: "${_default}"`)
      }
    }

    onChange(event, newArray)
  }

  return (
    <div
      className={cn(styles.checkbox_group, className, {
        [styles.checkbox_group__layout_main]: layout === 'main',
      })}
    >
      <div className={styles.checkbox_group_label}>{label}</div>
      <div
        className={cn(styles.checkbox_group_container, {
          [styles.checkbox_group_container__layout_main]: layout === 'main',
          [styles.checkbox_group_container___indicator_button]: theme === 'indicatorButton',
        })}
      >
        {options.map(({ value, caption }, index) => (
          <CheckboxCircular
            label={caption}
            name={name}
            checked={value === null ? false : values.includes(value)}
            key={value}
            onChange={(event) => handleChange(event, index)}
            value={value ?? ''}
            theme={theme}
          />
        ))}
      </div>
    </div>
  )
}
