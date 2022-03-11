import cn from 'classnames'
import { ReactNode, VFC, useRef, useEffect } from 'react'
import { FieldInputProps } from 'react-final-form'

import styles from './input-text.module.scss'

export interface InputTextProps extends FieldInputProps<string> {
  id: string
  type?: 'text' | 'password' | 'tel'
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  mode?: 'none' | 'rangeInput'
  placeholder?: string
  textHead?: string | ReactNode
  textTail?: string | ReactNode
  defaultValue?: string
  disabled?: boolean
  suffix?: string
  thousandSeparator?: boolean
}

export const InputText: VFC<InputTextProps> = ({
  type = 'text',
  mode = 'none',
  inputMode,
  textHead,
  textTail,
  suffix,
  thousandSeparator,
  value,
  onChange,
  ...rest
}) => {
  const input = useRef<HTMLInputElement | null>(null)

  const inputTextClassName = cn(styles.input_text, {
    [styles.input_text___with_text_head]: textHead,
    [styles.input_text___with_text_end]: textTail,
  })

  useEffect(() => {
    if (!suffix || !input.current) return
    input.current.style.width = (value.length + 1) * 8 + 'px'
  }, [value, suffix])

  return (
    <div
      className={cn(styles.input_container, {
        [styles.input_container___range]: mode === 'rangeInput',
      })}
    >
      <input
        className={inputTextClassName}
        onChange={(event) => {
          let value = event.currentTarget.value
          if (thousandSeparator) {
            value = String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
          }
          onChange(value)
        }}
        type={type}
        {...rest}
      />
      {suffix && rest.value && <span>{suffix}</span>}
      <span className={cn(styles.placeholder_text, styles.placeholder_text___head)}>
        {textHead}
      </span>
      <span className={cn(styles.placeholder_text, styles.placeholder_text___end)}>
        {textTail}
      </span>
    </div>
  )
}
