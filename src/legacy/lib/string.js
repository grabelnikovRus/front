/**!
 * String related methods for common application wide use cases.
 *
 * @format
 */

export default {
  encodeToDataUri,
  formatGroup,
  interpolate,
  splice,
};

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
export function encodeToDataUri(str, mediatype = "image/svg+xml", encoding = "") {
  return `data:${mediatype};${encoding},${encodeURIComponent(str)}`;
}

/**
 * Format string as number, inserting group separator.
 *
 * @public
 * @param {string} str Source string.
 * @param {string} [separator] Group separator.
 * @param {number} [size] Group size.
 * @returns {string} Group formatted string.
 */
export function formatGroup(str, separator = " ", size = 3) {
  return [...String(str)]
    .reverse()
    .reduce(
      (accum, value, index /*, array*/) =>
        value + (index % size ? "" : separator) + accum,
      ""
    )
    .slice(0, -1);
}

/**
 * Interpolate a string as template literal.
 *
 * @public
 * @param {string,undefined} template String as template literal.
 * @param {object} expressions Expressions to be embedded within template.
 * @returns {string} Interpolated string.
 */
export function interpolate(template, expressions) {
  if (typeof template !== 'string') return ''
  return template.replace(/\${[^}]+}/g, (match) => expressions[match.slice(2, -1)]);
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
export function splice(str, start = 0, count = 0, chars = "") {
  return str.slice(0, start) + chars + str.slice(start + count);
}
