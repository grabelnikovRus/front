import { FieldValidator } from 'final-form'
import { createElement, ReactElement } from 'react'
import {
  Field as FinalFormField,
  FieldProps as FinalFormFieldProps,
  FieldRenderProps,
} from 'react-final-form'

import { Validation } from '@/api'
import {
  formatDecimal,
  formatInteger,
  formatIntegerLocal,
  formatPhone,
  parseDecimal,
  parseInteger,
  parsePhone,
} from '@/lib/forms/mask'

import { validateValue } from '../form'

type FieldProps<FieldValue> = FinalFormFieldProps<FieldValue, FieldRenderProps<FieldValue>>

type MaskFn<FieldValue> = Pick<FieldProps<FieldValue>, 'parse' | 'format'>

interface Props<FieldValue> extends FieldProps<FieldValue> {
  validation: Validation
  mask?: 'phone' | 'decimal' | 'year' | 'floor' | 'price'
}

const validate =
  <FieldValue>(validation: Validation): FieldValidator<FieldValue> =>
  (value, values) =>
    validateValue(validation, value, values)

const getMaskFn = <FieldValue>(mask: Props<FieldValue>['mask']): MaskFn<FieldValue> => {
  if (mask === 'phone') {
    return {
      parse: parsePhone,
      format: formatPhone,
    }
  }
  if (mask === 'decimal') {
    return {
      parse: parseDecimal,
      format: formatDecimal,
    }
  }
  if (mask === 'year') {
    return {
      parse: parseInteger,
      format: formatInteger(4),
    }
  }
  if (mask === 'floor') {
    return {
      parse: parseInteger,
      format: formatInteger(3),
    }
  }
  if (mask === 'price') {
    return {
      parse: parseInteger,
      format: formatIntegerLocal,
    }
  }
  return {}
}

export const Field = <FieldValue = string>({
  validation,
  mask,
  ...rest
}: Props<FieldValue>): ReactElement =>
  createElement<FieldProps<FieldValue>>(FinalFormField, {
    validate: validate(validation),
    ...(mask ? getMaskFn<FieldValue>(mask) : {}),
    ...rest,
  })
