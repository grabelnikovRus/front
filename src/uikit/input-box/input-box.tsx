import cn from 'classnames'
import { VFC, ReactNode } from 'react'

import styles from './input-box.module.scss'

export interface InputBoxProps {
  htmlFor: string
  theme?: 'transparent' | 'opaque' | 'colored'
  label?: string
  unit?: string
  error?: string
  tooltip?: ReactNode
  children: ReactNode
}

export const InputBox: VFC<InputBoxProps> = ({
  htmlFor,
  label,
  unit,
  error,
  children,
  tooltip,
  theme = 'transparent',
}) => {
  const inputBoxClassName = cn(styles.input_box, {
    [styles.input_box___transparent]: theme === 'transparent',
    [styles.input_box___opaque]: theme === 'opaque',
    [styles.input_box___colored]: theme === 'colored',
  })

  return (
    <div className={inputBoxClassName}>
      {label && (
        <div className={styles.input_box_label}>
          <label htmlFor={htmlFor}>{label}</label>
          {unit && <span className={styles.input_box_unit}>{unit}</span>}
          {tooltip && <span className={styles.input_box_tooltip}>{tooltip}</span>}
        </div>
      )}
      <div className={cn({ [styles.input_box___error]: error })}>
        <div
          className={cn(styles.input_box_input, {
            [styles.input_box_input___error]: error,
          })}
        >
          {children}
        </div>
        {error && <div className={styles.input_box_error_text}>{error}</div>}
      </div>
    </div>
  )
}
