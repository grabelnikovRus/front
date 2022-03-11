export type ValueOf<T> = T[keyof T]

type Matcher = (input: unknown) => boolean

type UnknownFunction = (...args: unknown[]) => unknown

export const isNumber = (item: unknown): item is number => typeof item === 'number'

export const isString = (item: unknown): item is string => typeof item === 'string'

export const isStringOrNumber = (item: unknown): item is string | number =>
  isString(item) || isNumber(item)

export const isFunction = (item: unknown): item is UnknownFunction => typeof item === 'function'

export const isObject = (item: unknown): item is Record<string, unknown> =>
  typeof item === 'object' && item !== null

export const checkField = <Field extends string>(
  input: unknown,
  field: Field,
): input is Record<Field, unknown> => isObject(input) && field in input

export const isStructure = <T>(item: unknown, matchers: Record<string, Matcher>): item is T =>
  Object.entries(matchers).every(([key, matcher]) => checkField(item, key) && matcher(item[key]))

export const isArray = <Type>(item: unknown, matcher?: Matcher): item is Type[] =>
  Array.isArray(item) && (!matcher || matcher(item[0]))
