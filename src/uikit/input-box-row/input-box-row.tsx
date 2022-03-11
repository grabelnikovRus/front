import cn from 'classnames'
import { VFC, ReactNode, Children } from 'react'

import styles from './input-box-row.module.scss'

export interface InputBoxRowProps {
  htmlFor: string
  theme?: 'transparent' | 'opaque'
  label?: string
  unit?: string
  error?: string
  children: ReactNode
}

export const InputBoxRow: VFC<InputBoxRowProps> = ({
  htmlFor,
  label,
  unit,
  error,
  children,
  theme = 'transparent',
}) => {
  const hasError = error !== undefined

  const inputBoxClassName = cn(styles.input_box_row, {
    [styles.input_box_row___transparent]: theme === 'transparent',
    [styles.input_box_row___opaque]: theme === 'opaque',
  })

  return (
    <div className={inputBoxClassName}>
      {label && (
        <div className={styles.input_box_row_label}>
          <label htmlFor={htmlFor}>{label}</label>
          {unit && <span className={styles.input_box_row_unit}>{unit}</span>}
        </div>
      )}
      <div className={cn({ [styles.input_box_row___error]: hasError })}>
        <div className={cn(styles.input_box_row_container)}>
          {Children.map(children, (child) => (
            <div
              className={cn(styles.input_box_row_input, {
                [styles.input_box_row_input___error]: hasError,
              })}
            >
              {child}
            </div>
          ))}
        </div>
        {error && <div className={styles.input_box_row_error_text}>{error}</div>}
      </div>
    </div>
  )
}
