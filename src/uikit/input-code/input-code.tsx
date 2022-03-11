import cn from 'classnames'
import { FormEvent, KeyboardEvent, useRef, VFC } from 'react'
import NumberFormat from 'react-number-format'

import styles from './input-code.module.scss'

export interface InputCodeProps {
  label?: string
  phoneNumber: string
  value: string[]
  error?: string
  theme?: 'dark' | 'light' | 'lighter'
  onChange: (value: string[]) => void
}

const CODE_LENGTH = 4

const codeMaxIndex = CODE_LENGTH - 1

const inputIndexes = Array.from({ length: CODE_LENGTH }, (_, i) => i)

const getFieldIndex = (field: HTMLInputElement) => Number(field.name.replace(/\D/g, ''))

export const InputCode: VFC<InputCodeProps> = ({
  label,
  phoneNumber,
  value,
  error,
  theme = 'light',
  onChange,
}) => {
  const field0Ref = useRef<HTMLInputElement>(null)
  const field1Ref = useRef<HTMLInputElement>(null)
  const field2Ref = useRef<HTMLInputElement>(null)
  const field3Ref = useRef<HTMLInputElement>(null)

  const getFieldRefByIndex = (fieldIndex: number) => {
    switch (fieldIndex) {
      case 0:
        return field0Ref
      case 1:
        return field1Ref
      case 2:
        return field2Ref
      case 3:
        return field3Ref
      default:
        return field0Ref
    }
  }

  const focusField = (fieldIndex: number) => {
    getFieldRefByIndex(fieldIndex).current?.focus()
  }

  const onCodeKeyDown = ({ currentTarget: field, key }: KeyboardEvent<HTMLInputElement>) => {
    const fieldIndex = getFieldIndex(field)

    if (fieldIndex > 0 && key === 'Backspace' && field.value === '') {
      focusField(fieldIndex - 1)
    }
  }

  const onCodeChange = ({ currentTarget: field }: FormEvent<HTMLInputElement>) => {
    const fieldIndex = getFieldIndex(field)

    if (field.value.length > 1) {
      field.value = field.value.slice(-1)
    }

    const newValue = [...value]
    newValue[fieldIndex] = field.value

    onChange(newValue)

    if (fieldIndex < codeMaxIndex && field.value) {
      focusField(fieldIndex + 1)
    }
  }

  const hasError = error !== undefined

  return (
    <div className={styles.input_code}>
      <div
        className={cn(styles.input_code_label, {
          [styles.input_code_label___light]: theme === 'light',
          [styles.input_code_label___lighter]: theme === 'lighter',
          [styles.input_code_label___dark]: theme === 'dark',
        })}
      >
        {label ? <span>{label}</span> : null}
        <NumberFormat displayType="text" format="+# (###) ###-##-##" value={phoneNumber} />
      </div>
      <div
        className={cn(styles.input_code_fields, {
          [styles.input_code_fields___error]: hasError,
        })}
      >
        {inputIndexes.map((index) => (
          <input
            key={index}
            className={cn(styles.input_code_input, {
              [styles.input_code_input___error]: hasError,
              [styles.input_code_input___light]: theme === 'light',
              [styles.input_code_input___lighter]: theme === 'lighter',
              [styles.input_code_input___dark]: theme === 'dark',
            })}
            min={0}
            max={9}
            size={1}
            step={1}
            ref={getFieldRefByIndex(index)}
            name={`input-code-${index}`}
            onChange={onCodeChange}
            onKeyDown={onCodeKeyDown}
            placeholder="0"
            type="number"
            value={value[index] ?? ''}
            autoFocus={index === 0}
          />
        ))}
        <div className={styles.input_code_error}>{error}</div>
      </div>
    </div>
  )
}
