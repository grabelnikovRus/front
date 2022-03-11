import { FieldValidator } from 'final-form'
import { createElement, ReactElement } from 'react'
import { FieldArray as ReactFinalFormFieldArray, FieldArrayProps } from 'react-final-form-arrays'

import { Validation } from '@/api'

import { validateValue } from '../form'

interface Props<FieldValue> extends FieldArrayProps<FieldValue, HTMLElement> {
  validation: Validation
}

const validate =
  <FieldValue>(validation: Validation): FieldValidator<FieldValue> =>
  (value, values) =>
    validateValue(validation, value, values)

export const FieldArray = <FieldValue = string>({
  validation,
  ...rest
}: Props<FieldValue>): ReactElement =>
  createElement<FieldArrayProps<FieldValue, HTMLElement>>(ReactFinalFormFieldArray, {
    validate: validate(validation),
    ...rest,
  })
