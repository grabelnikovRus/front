/**
 * Removes trailing slash from url
 *
 * @public
 * @param {string} url
 * @returns {string} URL without trailing slash
 */
export const removeTrailingSlash = (url: string): string => url.replace(/\/+$/, '')

/**
 * Convert string to camelCase format
 *
 * @public
 * @param {string} str Source string to be formatted
 * @returns {string} Formatted string
 */
export const toCamelCase = (str: string): string => {
  const a = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  if (a === null) return ''
  const s = a.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()).join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

/**
 * Splice (remove or replace) characters from a string and/or adding new characters.
 * The method results differ from the native array splice for edge cases.
 *
 * @public
 * @param {string} str Source string to be spliced.
 * @param {number} [start] Index at which to start splicing.
 * @param {number} [count] Number of characters in string to remove from start.
 * @param {string} [chars] Characters to add to string, beginning from start.
 * @returns {string} Spliced string.
 */
export const splice = (str: string, start = 0, count = 0, chars = ''): string =>
  str.slice(0, start) + chars + str.slice(start + count)

/**
 * Encode a string (for example containing a SVG markup) to a data URI.
 * The method also replaces certain characters of SVG string by escape sequences representing UTF-8 encoding of the character.
 *
 * @public
 * @param {string} str Source string to be encoded.
 * @param {string} [mediatype] Might be "text/plain", "image/svg+xml", etc.
 * @param {string} [encoding] Might be "charset=US-ASCII", "charset=utf-8", "utf8", "base64", etc.
 * @returns {string} Encoded string.
 * @see https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
 * @see https://css-tricks.com/probably-dont-base64-svg/
 * @see https://dev.to/benjaminblack/using-a-string-of-svg-as-an-image-source-8mo
 */
export const encodeToDataUri = (
  str: string,
  mediatype = 'image/svg+xml',
  encoding = '',
): string => `data:${mediatype};${encoding},${encodeURIComponent(str)}`

/**
 * Format string as number, inserting group separator.
 *
 * @public
 * @param {string} str Source string.
 * @param {string} [separator] Group separator.
 * @param {number} [size] Group size.
 * @returns {string} Group formatted string.
 */
export const formatGroup = (str: string, separator = ' ', size = 3): string =>
  [...String(str)]
    .reverse()
    .reduce(
      (accum, value, index /*, array*/) => value + (index % size ? '' : separator) + accum,
      '',
    )
    .slice(0, -1)

/**
 * Interpolate a string as template literal.
 *
 * @public
 * @param {string,undefined} template String as template literal.
 * @param {object} expressions Expressions to be embedded within template.
 * @returns {string} Interpolated string.
 */
export const interpolate = (
  template: unknown | string,
  expressions: Record<string, unknown>,
): string => {
  if (typeof template !== 'string') return ''
  return template.replace(/\${[^}]+}/g, (match) => `${expressions[match.slice(2, -1)]}`)
}

/**
 * Replace line breaks with paragraph tags
 * @param str
 */
export const addParagraphs = (str: string): string =>
  `<p>${str.replace(/(\r[\t]*\n){2,}/g, '</p><p>').replace(/(\r[\t]*\n)/g, ' ')}</p>`
