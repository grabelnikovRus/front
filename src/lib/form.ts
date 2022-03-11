import {
  CatalogCheckboxGroup,
  CatalogNumberNew,
  CatalogTextNew,
  Validation,
  ValidationStringOrNumber,
} from '@/api'
import { toCamelCase } from '@/lib/string'
import { checkField, isString, isStringOrNumber } from '@/lib/types'

type Settings<FormValues> = Record<
  keyof FormValues,
  CatalogNumberNew | CatalogTextNew | CatalogCheckboxGroup
>

type FormErrors<FormValues> = Partial<Record<keyof FormValues, string>>

type ValidateValues<FormValues> = (
  values: Partial<FormValues>,
) => undefined | FormErrors<FormValues>

export const normalizeApiErrors = (errors: unknown[], defaultKey = '_'): Record<string, string> =>
  errors.reduce((acc: Record<string, string>, cur) => {
    const key = checkField(cur, 'field') && isString(cur.field) ? cur.field : undefined
    const value = checkField(cur, 'message') && isString(cur.message) ? cur.message : ''
    return { ...acc, [key === undefined ? defaultKey : toCamelCase(key)]: value }
  }, {})

type Message = string
type ValidateResult = Message | undefined

type ValidationRuleNumber = {
  value: number
  message: Message
}

type ValidationRulePattern = {
  value: string
  message: Message
}

type ValidationRuleField<FormValues> = {
  field: keyof FormValues
  message: Message
}

const validators = <FormValues extends Record<string, unknown>>() =>
  ({
    required:
      (message: Message) =>
      (data: unknown): ValidateResult => {
        if (Array.isArray(data)) {
          return data.length > 0 ? undefined : message
        } else {
          return data ? undefined : message
        }
      },
    pattern:
      ({ value, message }: ValidationRulePattern) =>
      (data: unknown): ValidateResult =>
        typeof data === 'string' && RegExp(value).test(data) ? undefined : message,
    minLength:
      ({ value, message }: ValidationRuleNumber) =>
      (data: unknown): ValidateResult =>
        typeof data === 'string' && data.length >= value ? undefined : message,
    maxLength:
      ({ value, message }: ValidationRuleNumber) =>
      (data: unknown): ValidateResult =>
        typeof data === 'string' && data.length <= value ? undefined : message,
    equalTo:
      ({ value, message }: ValidationStringOrNumber) =>
      (data: unknown): ValidateResult => {
        let dataNew = data
        if (Array.isArray(data) && data.length === 1) {
          dataNew = data[0]
        }
        return dataNew === value ? undefined : message
      },
    notEqualTo:
      ({ value, message }: ValidationStringOrNumber) =>
      (data: unknown): ValidateResult => {
        // TODO Удалить после изменения вывод чекбоксов в entry-form
        let dataNew = data
        if (Array.isArray(data) && data.length === 1) {
          dataNew = data[0]
        }
        return dataNew !== value ? undefined : message
      },
    greaterThan:
      ({ value, message }: ValidationRuleNumber) =>
      (data: unknown): ValidateResult =>
        isStringOrNumber(data) && (Number.isNaN(data) || data > value) ? undefined : message,
    greaterThanOrEqual:
      ({ value, message }: ValidationRuleNumber) =>
      (data: unknown): ValidateResult =>
        isStringOrNumber(data) && (Number.isNaN(data) || data >= value) ? undefined : message,
    lessThan:
      ({ value, message }: ValidationRuleNumber) =>
      (data: unknown): ValidateResult =>
        isStringOrNumber(data) && (Number.isNaN(data) || data < value) ? undefined : message,
    lessThanOrEqual:
      ({ value, message }: ValidationRuleNumber) =>
      (data: unknown): ValidateResult =>
        isStringOrNumber(data) && (Number.isNaN(data) || data <= value) ? undefined : message,
    equalToField:
      ({ field, message }: ValidationRuleField<FormValues>) =>
      (data: unknown, allValues: FormValues): ValidateResult =>
        isStringOrNumber(data) && field && data === allValues[field] ? undefined : message,
    notEqualToField:
      ({ field, message }: ValidationRuleField<FormValues>) =>
      (data: unknown, allValues: FormValues): ValidateResult =>
        isStringOrNumber(data) && field && data !== allValues[field] ? undefined : message,
    greaterThanField:
      ({ field, message }: ValidationRuleField<FormValues>) =>
      (data: unknown, allValues: FormValues): ValidateResult =>
        isStringOrNumber(data) && field && data > allValues[field] ? undefined : message,
    greaterOrEqualThanField:
      ({ field, message }: ValidationRuleField<FormValues>) =>
      (data: unknown, allValues: FormValues): ValidateResult =>
        isStringOrNumber(data) && field && data >= allValues[field] ? undefined : message,
    lessThanField:
      ({ field, message }: ValidationRuleField<FormValues>) =>
      (data: unknown, allValues: FormValues): ValidateResult =>
        isStringOrNumber(data) && field && data < allValues[field] ? undefined : message,
    lessThanOrEqualToField:
      ({ field, message }: ValidationRuleField<FormValues>) =>
      (data: unknown, allValues: FormValues): ValidateResult =>
        isStringOrNumber(data) && field && data <= allValues[field] ? undefined : message,
  } as const)

type ValidationFn = <FormValues>(data: unknown, allValues: FormValues) => ValidateResult

const composeValidators =
  <FormValues>(...validations: ValidationFn[]) =>
  (data: unknown, allValues: FormValues): ValidateResult =>
    validations.reduce(
      (error: ValidateResult, validator: ValidationFn) => error || validator(data, allValues),
      undefined,
    )

const validator = (rules: Validation) => {
  const validationResults = Object.entries(rules).map(([name, rule]) => {
    const validator = validators()[name as keyof Validation]
    return validator(rule)
  })

  // @ts-ignore FormValues are the same
  return composeValidators(...validationResults)
}

export const validateValue = <FormValues>(
  rules: Validation,
  value: unknown,
  allValues: FormValues,
): ValidateResult => validator(rules)(value, allValues)

export const validate =
  <FormValues>(settings: Settings<FormValues>): ValidateValues<FormValues> =>
  (values) => {
    const errors: FormErrors<FormValues> = {}

    Object.entries(settings).forEach(([key, setting]) => {
      const field = key as keyof FormValues
      const rules = (setting as CatalogNumberNew | CatalogTextNew | CatalogCheckboxGroup)
        .validation
      const value = values[field]
      let error: ValidateResult

      if (value !== undefined || 'required' in rules) {
        error = validateValue(rules, value, values)
      }

      if (error !== undefined) {
        errors[field] = error
      }
    })

    return Object.entries(errors).length > 0 ? errors : undefined
  }
