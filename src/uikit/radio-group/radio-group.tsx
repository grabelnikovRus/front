import cn from 'classnames'
import { ChangeEvent, VFC } from 'react'
import { FieldArrayRenderProps } from 'react-final-form-arrays'

import { CatalogCheckboxGroupOptions, CatalogCheckboxGroupLayoutEnum } from '@/api'

import styles from './radio-group.module.scss'

export interface RadioGroupProps extends FieldArrayRenderProps<string, HTMLElement> {
  options: CatalogCheckboxGroupOptions[]
  theme?: 'list' | 'buttons' | 'switcher'
  layout?: CatalogCheckboxGroupLayoutEnum
  label?: string
  hideError?: boolean
  onClick?: (value: string) => void
}

export const RadioGroup: VFC<RadioGroupProps> = ({
  fields,
  meta,
  options,
  theme = 'list',
  label,
  layout = CatalogCheckboxGroupLayoutEnum.Column,
  onClick,
  hideError = false,
}) => {
  const error = !hideError && meta.submitFailed && (meta.error || meta.submitError)

  const radioClassName = cn(styles.radio, {
    [styles.radio___list]: theme === 'list',
    [styles.radio___buttons]: theme === 'buttons',
    [styles.radio___switcher]: theme === 'switcher',
    [styles.radio___column]: layout === CatalogCheckboxGroupLayoutEnum.Column,
    [styles.radio___row]: layout === CatalogCheckboxGroupLayoutEnum.Row,
    [styles.radio___error]: error,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = options[index]
    const { checked } = event.target

    if (!value) return

    fields.forEach((_) => fields.pop())
    if (checked) {
      fields.push(value)
      onClick?.(value)
    }
  }

  return (
    <div className={radioClassName}>
      {label && <h5 className={styles.radio_title}>{label}</h5>}
      <ul className={styles.radio_wrapper}>
        {options.map(({ value, caption }, index) => {
          if (!value) return null
          return (
            <li key={caption} className={styles.radio_item}>
              <input
                className={styles.radio_input}
                type="radio"
                id={`${fields.name}-${value}`}
                name={fields.name}
                value={value}
                onChange={(event) => handleChange(event, index)}
                checked={fields.value ? fields.value[0] === value : false}
              />
              <label className={styles.radio_label} htmlFor={`${fields.name}-${value}`}>
                {caption}
              </label>
            </li>
          )
        })}
      </ul>
      {error && <div className={styles.radio_error}>{error}</div>}
    </div>
  )
}
