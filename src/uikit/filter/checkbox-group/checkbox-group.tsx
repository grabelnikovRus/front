import cn from 'classnames'
import { ChangeEvent, VFC } from 'react'
import { FieldArrayRenderProps } from 'react-final-form-arrays'

import {
  CatalogCheckboxGroupOptions,
  CatalogCheckboxGroupLayoutEnum,
  CatalogCheckboxGroupStrategyEnum,
} from '@/api'
import { CheckboxCircular } from '@/uikit/filter/checkbox-circular/checkbox-circular'

import styles from './checkbox-group.module.scss'

interface CheckboxGroupProps extends FieldArrayRenderProps<string, HTMLElement> {
  layout?: CatalogCheckboxGroupLayoutEnum
  label: string
  theme?: 'opaque' | 'classic'
  options?: CatalogCheckboxGroupOptions[]
  strategy?: CatalogCheckboxGroupStrategyEnum
  initial?: string | number | string[] | null
  disabledRepeatedClick?: boolean
  hideError?: boolean
  onClick?: (value: string) => void
}

export const CheckboxGroup: VFC<CheckboxGroupProps> = ({
  fields,
  options,
  label,
  layout = CatalogCheckboxGroupLayoutEnum.Row,
  theme = 'opaque',
  strategy = CatalogCheckboxGroupStrategyEnum.ByDefault,
  initial,
  meta,
  disabledRepeatedClick = false,
  onClick,
  hideError = false,
}) => {
  const error = !hideError && meta.submitFailed && (meta.error || meta.submitError)
  const checkboxGroupClassName = cn(styles.checkbox_group, {
    [styles.checkbox_group___layout_row]: layout === 'row',
    [styles.checkbox_group___layout_main]: layout === 'main',
    [styles.checkbox_group___layout_wrap]: layout === 'wrap',
    [styles.checkbox_group___layout_column]: layout === 'column' && theme !== 'classic',
    [styles.checkbox_group___opaque]: theme === 'opaque',
    [styles.checkbox_group___classic]: theme === 'classic',
  })
  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    if (!options) return

    const { value } = options[index]
    const { checked } = event.target

    if (value === null) return

    onClick?.(value)

    if (checked) {
      if (strategy === 'by-default') {
        if (Array.isArray(initial) && Array.isArray(fields.value) && fields.value.length) {
          initial.forEach((item) => {
            const idx = fields.value.indexOf(item)

            if (value !== item) {
              if (idx > -1) {
                fields.remove(idx)
              }

              fields.push(value)
            }

            if (value === item) {
              if (fields.value.length) {
                // @ts-ignore missing method in types definition
                // https://final-form.org/docs/final-form-arrays/api#formmutatorsremovebatch
                fields.removeBatch(fields.value.map((_, i) => i))
              }

              fields.push(value)
            }
          })

          return
        }

        fields.push(value)

        return
      }

      fields.push(value)

      if (strategy === 'only-one') {
        if (Array.isArray(fields.value) && fields.value.length) {
          fields.value.forEach((field, i) => {
            fields.remove(i)
          })
        }
      }

      return
    }

    const oneValueInField = fields.value.length === 1

    if (disabledRepeatedClick) return

    if (Array.isArray(initial) && Array.isArray(fields.value) && oneValueInField) {
      initial.forEach((item) => {
        if (value !== item) {
          fields.push(item)
        }
      })
    }

    const idx = fields.value.indexOf(value)
    fields.remove(idx)
  }

  if (!options) return null

  return (
    <div className={checkboxGroupClassName}>
      <div className={styles.checkbox_group_label}>{label}</div>
      <div
        className={cn({
          [styles.checkbox_group_container___error]: error && theme !== 'classic',
        })}
      >
        <div className={styles.checkbox_group_container}>
          {options.map(({ caption, icon, value }, index) => (
            <div className={styles.checkbox_group_item} key={caption}>
              <CheckboxCircular
                label={caption}
                name={`${fields.name}-${value}`}
                checked={value === null ? false : fields.value?.includes(value)}
                onChange={(event) => handleChange(event, index)}
                theme={theme}
                icon={icon}
                layout={layout}
                error={error}
              />
            </div>
          ))}
        </div>
        {error && (
          <div
            className={cn(styles.checkbox_group_error_text, {
              [styles.checkbox_group_error_text___red]: theme === 'classic',
            })}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
