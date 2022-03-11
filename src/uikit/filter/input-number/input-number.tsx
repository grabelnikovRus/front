import cn from 'classnames'
import { VFC } from 'react'
import NumberFormat, { NumberFormatProps } from 'react-number-format'

import styles from './input-number.module.scss'

export interface InputNumberProps {
  id: string
  name: string
  type?: 'text' | 'tel' | 'password'
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  placeholder?: string
  value?: string
  textHead?: string
  textTail?: string
  onChange: (data?: number) => void
  defaultValue?: string
  disabled?: boolean
  format?: Partial<NumberFormatProps>
  onBlur?: () => void
  onFocus?: () => void
}

export const InputNumber: VFC<InputNumberProps> = ({
  type = 'text',
  inputMode,
  textHead,
  textTail,
  onChange,
  format,
  ...rest
}) => {
  const inputNumberClassName = cn(styles.input_number, {
    [styles.input_number___with_text_head]: textHead,
    [styles.input_number___with_text_end]: textTail,
  })

  return (
    <div className={styles.input_container}>
      <NumberFormat
        className={inputNumberClassName}
        onValueChange={(v) => {
          onChange(v.floatValue)
        }}
        inputMode={inputMode}
        type={type}
        {...rest}
        {...format}
      />
      <span className={cn(styles.placeholder_text, styles.placeholder_text___head)}>
        {textHead}
      </span>
      <span className={cn(styles.placeholder_text, styles.placeholder_text___end)}>
        {textTail}
      </span>
    </div>
  )
}
