const path = require('path')

/**
 * @param name {string}
 * @returns {string}
 */
function formatExportName(name) {
  return `Svg${name
    .split('-')
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join('')}`
}

/**
 * @param filePaths {string}
 * @returns {string}
 */
module.exports = (filePaths) => {
  const content = filePaths
    .map((filePath) => {
      const basename = path.basename(filePath, path.extname(filePath))
      const exportName = formatExportName(basename)

      return `export { ${exportName} } from './${basename}'`
    })
    .join('\n')

  return `${content}\n`
}
