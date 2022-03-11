import {
  formatDecimal,
  formatPhone,
  parseDecimal,
  parseInteger,
  parsePhone,
} from '@/lib/forms/mask'

describe('formatPhone', () => {
  test('general cases', () => {
    expect(formatPhone('')).toEqual('')
    expect(formatPhone('+')).toEqual('')
    expect(formatPhone('79991111111')).toEqual('+7(999) 111-11-11')
    expect(formatPhone('8(999)111-11-11')).toEqual('+7(999) 111-11-11')
    expect(formatPhone('(999)111-11-11')).toEqual('+7(999) 111-11-11')
  })
  test('corner cases', () => {
    expect(formatPhone(undefined)).toEqual('')
    expect(formatPhone(null)).toEqual('')
  })
})

describe('parsePhone', () => {
  test('general cases', () => {
    expect(parsePhone('+7(')).toEqual('7')
    expect(parsePhone('+')).toEqual('')
    expect(parsePhone('+7(999) 111-11-11')).toEqual('79991111111')
    expect(parsePhone('+7(999) 111-11-116')).toEqual('79991111111')
  })
  test('corner cases', () => {
    expect(parsePhone(undefined)).toEqual(undefined)
    expect(parsePhone(null)).toEqual(null)
  })
})

describe('formatDecimal', () => {
  test('general cases', () => {
    expect(formatDecimal('1234567.89')).toEqual('1 234 567,89')
    expect(formatDecimal('23.')).toEqual('23,')
    expect(formatDecimal('')).toEqual('')
    expect(formatDecimal('12.3456789')).toEqual('12,34')
  })
})

describe('parseDecimal', () => {
  test('general cases', () => {
    expect(parseDecimal('123,')).toEqual('123.')
    expect(parseDecimal('123,45')).toEqual('123.45')
    expect(parseDecimal('123.45')).toEqual('123.45')
    expect(parseDecimal('123.45.67')).toEqual('123.45')
    expect(parseDecimal('1 234 567,89')).toEqual('1234567.89')
    expect(parseDecimal('12,3456789')).toEqual('12.34')
  })
  test('corner cases', () => {
    expect(parseDecimal('qwerty')).toEqual('')
  })
})

describe('parseInteger', () => {
  test('general cases', () => {
    expect(parseInteger('123,45')).toEqual('123')
    expect(parseInteger('123.45')).toEqual('123')
    expect(parseInteger('123.45.67')).toEqual('123')
    expect(parseInteger('1 234 567,89')).toEqual('1234567')
  })
  test('corner cases', () => {
    expect(parseInteger('qwerty')).toEqual('')
  })
})
