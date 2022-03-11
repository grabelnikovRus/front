import { ParsedUrlQuery } from 'querystring'

const normalizeMethods = {
  toArray: function <T>(value: T) {
    return typeof value === 'string' ? value.split(',') : undefined
  },
  toNumber: function <T>(value: T): number | number[] | string {
    return (Array.isArray(value) ? value.map(this.toNumber) : Number(value) || value) as
      | number
      | number[]
      | string
  },
}

type NormalizeMethodsUnion = keyof typeof normalizeMethods
type NormalizeMethodsReturnType = ReturnType<typeof normalizeMethods[NormalizeMethodsUnion]>

function chainFilters(filters: NormalizeMethodsUnion[], val: NormalizeMethodsReturnType) {
  let result: NormalizeMethodsReturnType = val
  for (const filter of filters) {
    result = normalizeMethods[filter](result)
  }

  return result
}

function getObj<T>(obj: {
  [key in keyof T]: NormalizeMethodsUnion[]
}) {
  return obj
}

const objectMapQuery = getObj({
  ll: ['toArray', 'toNumber'],
  z: ['toNumber'],
})

type KeysUnion = keyof typeof objectMapQuery
export type ParseMapQueryReturnType = {
  [key in KeysUnion]?: NormalizeMethodsReturnType
}

const keys = Object.keys(objectMapQuery)

export const parseMapQuery = (
  query: ParsedUrlQuery,
  format?: 'normalize',
): ParseMapQueryReturnType => {
  if (!Object.keys(query).length) return {}

  const values = keys.reduce((acc, key) => {
    const valueByQuery = query[key]
    if (valueByQuery) {
      const valueByObj = objectMapQuery[key as KeysUnion]
      let value = valueByQuery as NormalizeMethodsReturnType

      if (format && valueByObj.length) {
        value =
          valueByObj.length === 1
            ? normalizeMethods[valueByObj[0]](valueByQuery)
            : chainFilters(valueByObj, valueByQuery)
      }
      acc[key as KeysUnion] = value
    }

    return acc
  }, {} as ParseMapQueryReturnType)

  return values
}
