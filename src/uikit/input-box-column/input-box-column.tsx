import cn from 'classnames'
import { VFC, ReactNode, Children } from 'react'

import styles from './input-box-column.module.scss'

export interface InputBoxColumnProps {
  htmlFor: string
  theme?: 'transparent' | 'opaque'
  label?: string
  unit?: string
  error?: string
  children: ReactNode
}

export const InputBoxColumn: VFC<InputBoxColumnProps> = ({
  htmlFor,
  label,
  unit,
  error,
  children,
  theme = 'transparent',
}) => {
  const hasError = error !== undefined

  const inputBoxClassName = cn(styles.input_box_column, {
    [styles.input_box_column___transparent]: theme === 'transparent',
    [styles.input_box_column___opaque]: theme === 'opaque',
  })

  return (
    <div className={inputBoxClassName}>
      {label && (
        <div className={styles.input_box_column_label}>
          <label htmlFor={htmlFor}>{label}</label>
          {unit && <span className={styles.input_box_column_unit}>{unit}</span>}
        </div>
      )}
      <div className={cn(styles.input_box_column_container)}>
        {Children.map(children, (child, i) => {
          const numberChildren = Children.count(children)
          const isLastChild = numberChildren === i + 1

          return (
            <div
              className={cn({
                [styles.input_box_column___error_bg]: hasError && isLastChild,
                [styles.input_box_column___error]: hasError,
              })}
            >
              <div
                className={cn(styles.input_box_column_input, {
                  [styles.input_box_column_input___error]: hasError,
                })}
              >
                {child}
              </div>
              {error && isLastChild && (
                <div className={styles.input_box_column_error_text}>{error}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
