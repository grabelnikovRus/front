/**
 * Pluralize Russian cardinal numeral, including amount.
 *
 * @public
 * @param {number|string} amount Amount to pluralize.
 * @param {string[]} suffix Suffixes.
 * @param {boolean} [include] Whether to include amount.
 * @param {"ru-RU"|string} [locale] Language locale.
 * @returns {string} Pluralized cardinal numeral, including amount.
 */
export const pluralizeCardinal = (
  amount: number | string,
  suffix: readonly string[],
  include = true,
  locale = 'ru-RU',
): string => {
  const int = Number.parseInt(`${amount}`) // Accept float numbers and strings.

  if (locale === 'ru-RU') {
    const notTeen = int % 100 < 11 || 19 < int % 100

    switch (true) {
      case notTeen && int % 10 === 1:
        return include ? `${amount} ${suffix[1]}` : suffix[1]
      case notTeen && (int % 10 === 2 || int % 10 === 3 || int % 10 === 4):
        return include ? `${amount} ${suffix[2]}` : suffix[2]
      default:
        return include ? `${amount} ${suffix[0]}` : suffix[0]
    }
  }
  switch (true) {
    case int === 1:
      return include ? `${amount} ${suffix[1]}` : suffix[1]
    default:
      return include ? `${amount} ${suffix[0]}` : suffix[0]
  }
}

/**
 * Pluralize Russian ordinal numeral, including count.
 *
 * @public
 * @param {number|string} count Counting number to pluralize.
 * @param {string[]} suffix Suffixes.
 * @param {boolean} [include] Whether to include count.
 * @param {"ru-RU"|string} [locale] Language locale.
 * @returns {string} Pluralized ordinal numeral, including count.
 */
export const pluralizeOrdinal = (
  count: number | string,
  suffix: string[],
  include = true,
  locale = 'ru-RU',
): string => {
  const int = Number.parseInt(`${count}`) // Accept float numbers and strings.

  if (locale === 'ru-RU') {
    const notTeen = int % 100 < 11 || 19 < int % 100

    switch (true) {
      case int === 0:
        return include ? `${count}${suffix[1]}` : suffix[1]
      case notTeen &&
        (int % 10 === 0 || int % 10 === 1 || int % 10 === 4 || int % 10 === 5 || int % 10 === 9):
        return include ? `${count}${suffix[0]}` : suffix[0]
      case notTeen && (int % 10 === 2 || int % 10 === 6 || int % 10 === 7 || int % 10 === 8):
        return include ? `${count}${suffix[1]}` : suffix[1]
      case notTeen && int % 10 === 3:
        return include ? `${count}${suffix[2]}` : suffix[2]
      default:
        return include ? `${count}${suffix[0]}` : suffix[0]
    }
  }
  switch (true) {
    case int === 1:
      return include ? `${count}${suffix[1]}` : suffix[1]
    case int === 2:
      return include ? `${count}${suffix[2]}` : suffix[2]
    case int === 3:
      return include ? `${count}${suffix[3]}` : suffix[3]
    default:
      return include ? `${count}${suffix[0]}` : suffix[0]
  }
}
