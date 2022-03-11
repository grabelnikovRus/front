import {
  formatGroup,
  splice,
  interpolate,
  encodeToDataUri,
  removeTrailingSlash,
  toCamelCase,
  addParagraphs,
} from './string'

test('removeTrailingSlash formats URL', () => {
  expect(removeTrailingSlash('https://ya.ru/')).toStrictEqual('https://ya.ru')
})

test('toCamelCase returns formatted string', () => {
  expect(toCamelCase('12 feet')).toStrictEqual('12Feet')
  expect(toCamelCase('enable 6h format')).toStrictEqual('enable6HFormat')
  expect(toCamelCase('enable 24H format')).toStrictEqual('enable24HFormat')
  expect(toCamelCase('too legit 2 quit')).toStrictEqual('tooLegit2Quit')
  expect(toCamelCase('walk 500 miles')).toStrictEqual('walk500Miles')
  expect(toCamelCase('xhr2 request')).toStrictEqual('xhr2Request')
})

test('toCamelCase should handle acronyms', () => {
  ;['safe HTML', 'safeHTML'].forEach((string) => {
    expect(toCamelCase(string)).toStrictEqual('safeHtml')
  })
  ;['escape HTML entities', 'escapeHTMLEntities'].forEach((string) => {
    expect(toCamelCase(string)).toStrictEqual('escapeHtmlEntities')
  })
  ;['XMLHttpRequest', 'XmlHTTPRequest'].forEach((string) => {
    expect(toCamelCase(string)).toStrictEqual('xmlHttpRequest')
  })
})

test('formatGroup returns group formatted string', () => {
  expect(formatGroup('')).toStrictEqual('')
  expect(formatGroup('', '-', 0)).toStrictEqual('')
  expect(formatGroup('', '-', 1)).toStrictEqual('')
  expect(formatGroup('1')).toStrictEqual('1')
  expect(formatGroup('12')).toStrictEqual('12')
  expect(formatGroup('123')).toStrictEqual('123')
  expect(formatGroup('1234')).toStrictEqual('1 234')
  expect(formatGroup('12345')).toStrictEqual('12 345')
  expect(formatGroup('123456')).toStrictEqual('123 456')
  expect(formatGroup('abcd', '-', 0)).toStrictEqual('a-b-c-d')
  expect(formatGroup('abcd', '-', 1)).toStrictEqual('a-b-c-d')
  expect(formatGroup('abcd', '-', 2)).toStrictEqual('ab-cd')
})
test('splice returns spliced string', () => {
  expect(splice('abc')).toStrictEqual('abc')
  expect(splice('abc', 0)).toStrictEqual('abc')
  expect(splice('abc', 1)).toStrictEqual('abc')
  expect(splice('abc', 2)).toStrictEqual('abc')
  expect(splice('abc', 3)).toStrictEqual('abc')
  expect(splice('abc', 0, 0)).toStrictEqual('abc')
  expect(splice('abc', 1, 0)).toStrictEqual('abc')
  expect(splice('abc', 2, 0)).toStrictEqual('abc')
  expect(splice('abc', 3, 0)).toStrictEqual('abc')
  expect(splice('abc', 0, 1)).toStrictEqual('bc')
  expect(splice('abc', 1, 1)).toStrictEqual('ac')
  expect(splice('abc', 2, 1)).toStrictEqual('ab')
  expect(splice('abc', 3, 1)).toStrictEqual('abc')
  expect(splice('abc', 0, 2)).toStrictEqual('c')
  expect(splice('abc', 1, 2)).toStrictEqual('a')
  expect(splice('abc', 2, 2)).toStrictEqual('ab')
  expect(splice('abc', 3, 2)).toStrictEqual('abc')
  expect(splice('abc', 0, 3)).toStrictEqual('')
  expect(splice('abc', 1, 3)).toStrictEqual('a')
  expect(splice('abc', 2, 3)).toStrictEqual('ab')
  expect(splice('abc', 3, 3)).toStrictEqual('abc')
  expect(splice('abc', 0, 0, '-')).toStrictEqual('-abc')
  expect(splice('abc', 1, 0, '-')).toStrictEqual('a-bc')
  expect(splice('abc', 2, 0, '-')).toStrictEqual('ab-c')
  expect(splice('abc', 3, 0, '-')).toStrictEqual('abc-')
  expect(splice('abc', 0, 1, '-')).toStrictEqual('-bc')
  expect(splice('abc', 1, 1, '-')).toStrictEqual('a-c')
  expect(splice('abc', 2, 1, '-')).toStrictEqual('ab-')
  expect(splice('abc', 3, 1, '-')).toStrictEqual('abc-')
  expect(splice('abc', 0, 2, '-')).toStrictEqual('-c')
  expect(splice('abc', 1, 2, '-')).toStrictEqual('a-')
  expect(splice('abc', 2, 2, '-')).toStrictEqual('ab-')
  expect(splice('abc', 3, 2, '-')).toStrictEqual('abc-')
  expect(splice('abc', 0, 3, '-')).toStrictEqual('-')
  expect(splice('abc', 1, 3, '-')).toStrictEqual('a-')
  expect(splice('abc', 2, 3, '-')).toStrictEqual('ab-')
  expect(splice('abc', 3, 3, '-')).toStrictEqual('abc-')
})

test('interpolate', () => {
  expect(interpolate('Minimal value is ${min}', { min: 42 })).toStrictEqual('Minimal value is 42')
})

test('encodeToDataUri', () => {
  expect(
    encodeToDataUri(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" /></svg>',
    ),
  ).toMatchInlineSnapshot(
    `"data:image/svg+xml;,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2210%22%20height%3D%2210%22%20%2F%3E%3C%2Fsvg%3E"`,
  )
})

test('addParagraphs', () => {
  const str = `q\r\n\r\nw\r\n\r\ne\r\n\r\nr\r\n\r\nt\r\ny`
  expect(addParagraphs(str)).toMatchInlineSnapshot(`"<p>q</p><p>w</p><p>e</p><p>r</p><p>t y</p>"`)
})
