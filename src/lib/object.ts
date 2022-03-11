/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-types
export const removeUndefined = <Value extends {}>(value: Value): Value => {
  const data = Array.isArray(value) ? value.filter((i) => i !== undefined) : value
  if (typeof data !== 'object' || data === null) {
    return data
  }
  // @ts-ignore
  return Object.keys(data).reduce(
    (acc, key) => {
      // @ts-ignore
      const value = data[key]
      if (value !== undefined) {
        // @ts-ignore
        acc[key] = typeof value === 'object' ? removeUndefined(value) : value
      }
      return acc
    },
    Array.isArray(value) ? [] : {},
  )
}
