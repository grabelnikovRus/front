/**
 * Clamps num within the inclusive range specified by the boundary values a and b.
 * If num falls within the range, return num.
 * Otherwise, return the nearest number in the range.
 */
export const clamp = (num: number, a: number, b: number): number =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))

/**
 * Rounds a number to a specified amount of digits.
 * Use Math.round() and template literals to round the number to the specified number of digits.
 * Omit the second argument, decimals, to round to an integer.
 */
export const round = (n: number, decimals = 0): number =>
  Number(`${Math.round(Number(`${n}e${decimals}`))}e-${decimals}`)

/**
 * Rounds a number to percent string.
 */
export const formatToPercent = (rate: null | undefined | number = 0): string =>
  `${round((rate ?? 0) * 100, 2)}%`.replace('.', ',')

/**
 * Round down a number to a specified number of digits
 * @param n
 * @param decimals
 */
export const floor = (n: number, decimals = 0): number =>
  Number(`${Math.floor(Number(`${n}e${decimals}`))}e-${decimals}`)
