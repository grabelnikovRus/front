import { floor } from '@/lib/number'
import { splice } from '@/lib/string'

/**
 * Format value as a phone number.
 */
export const formatPhone = <FieldValue>(value: FieldValue): FieldValue => {
  if (typeof value !== 'string') return '' as unknown as FieldValue
  let newValue = value.replace(/\D/g, '')
  if (newValue.length === 0) return '' as unknown as FieldValue
  const digits = newValue.replace(/^[78]/, '')

  if (digits) {
    let index = 0

    if (digits.length > index) {
      newValue = digits
      index += 3
      if (digits.length > index) {
        newValue = splice(newValue, index, 0, ') ')
        index += 5
        if (digits.length > index - 2) {
          newValue = splice(newValue, index, 0, '-')
          index += 3
          if (digits.length > index - 3) {
            newValue = splice(newValue, index, 0, '-')
          }
        }
      }
      newValue = '+7(' + newValue.slice(0, 14)
    }
  } else {
    newValue = '+7('
  }
  return newValue as unknown as FieldValue
}

/**
 * Parse formatted phone as a field value.
 */
export const parsePhone = <FieldValue>(value: unknown): FieldValue => {
  if (typeof value === 'string') {
    const newValue = value.replace(/\D/g, '')
    return newValue.substr(0, 11) as unknown as FieldValue
  }
  return value as FieldValue
}

/**
 * Format value as a decimal number
 * @param value
 */

export const formatDecimal = <FieldValue>(value: FieldValue): FieldValue => {
  if (typeof value !== 'string' || value === '') return '' as unknown as FieldValue
  const number = Number(value.replace(',', '.'))
  const localNumber = floor(number, 2).toLocaleString('ru-RU')
  if (value.endsWith('.')) return `${localNumber},` as unknown as FieldValue
  return localNumber as unknown as FieldValue
}

/**
 * Parse formatted decimal value
 */
export const parseDecimal = <FieldValue>(value: unknown): FieldValue => {
  if (typeof value === 'string') {
    const string = value.replace(/\./g, ',').replace(',', '.').replace(/[,\s]/g, '')
    const number = Number.parseFloat(string)
    if (Number.isNaN(number)) return '' as unknown as FieldValue
    if (string.endsWith('.')) {
      return `${number.toString(10)}.` as unknown as FieldValue
    }
    return floor(number, 2).toString(10) as unknown as FieldValue
  }
  return value as FieldValue
}

/**
 * Parse formatted integer value
 */
export const parseInteger = <FieldValue>(value: unknown): FieldValue => {
  if (typeof value === 'string') {
    const number = Number.parseInt(value.replace(/\s/g, ''), 10)
    if (Number.isNaN(number)) return '' as unknown as FieldValue
    return number.toString(10) as unknown as FieldValue
  }
  return value as FieldValue
}

/**
 * Format value as a number
 */

export const formatInteger =
  <FieldValue>(length: number) =>
  (value: FieldValue): FieldValue => {
    if (typeof value !== 'string' || value === '') return '' as unknown as FieldValue
    return value.slice(0, length) as unknown as FieldValue
  }

/**
 * Format value as a local number
 */

export const formatIntegerLocal = <FieldValue>(value: FieldValue): FieldValue => {
  if (typeof value !== 'string' || value === '') return '' as unknown as FieldValue
  return Number(value).toLocaleString('ru-RU') as unknown as FieldValue
}
