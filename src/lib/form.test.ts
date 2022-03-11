import { CatalogTextNewTypeEnum } from '@/api'
import { validate } from '@/lib/form'
import { catalogSettings } from '@/modules/settings-v1/catalog-settings.mock'

const validator = validate(catalogSettings)

const mockSettings = {
  title: 'foo',
  placeholder: 'Foo',
  type: CatalogTextNewTypeEnum.Text,
  initial: null,
  validation: {},
}

describe('validate – success cases', () => {
  test('empty', () => {
    expect(validator({})).toBeUndefined()
  })
  test('success', () => {
    expect(
      validator({
        roominess: ['1'],
        priceRubMin: 3000000,
        priceRubMax: 15000000,
        fullAreaMin: '1',
        fullAreaMax: '149',
        kitchensAreaMin: '1',
        kitchensAreaMax: '49',
        livingAreaMin: '1',
        livingAreaMax: '149',
        buildingCeilingHeight: ['<=250'],
        housingTypes: ['024268c5-c499-45c1-b32d-284a212f93e5'],
        decorationTypes: ['86bedc34-b9bc-49ec-bc09-bd823257cc58'],
        buildingTypes: [
          '26327a32-920e-40c3-a508-c893095098b5',
          '4056adab-65e4-40ef-877c-a1a318d8a955',
        ],
        windowViewTypes: ['cec3f7b3-035e-40e0-abf9-8a512d98e4ab'],
        buildingParkingTypes: ['769e2c6a-14b2-4669-b456-a9737ee1032f'],
        wcsType: ['separate'],
        elevatorType: ['freight'],
        balconyType: ['balcony'],
        buildingGarbageChute: ['yes'],
      }),
    ).toBeUndefined()
  })
})

describe('validate – error cases', () => {
  test('required', () => {
    expect(
      validate({ foo: { ...mockSettings, validation: { required: 'Required message' } } })({}),
    ).toEqual({
      foo: 'Required message',
    })
  })
  test('required array', () => {
    expect(
      validate({ foo: { ...mockSettings, validation: { required: 'Required message' } } })({
        foo: [],
      }),
    ).toEqual({
      foo: 'Required message',
    })
  })
  test('pattern', () => {
    expect(
      validate({
        foo: {
          ...mockSettings,
          validation: { pattern: { value: '[a-z]', message: 'Pattern message' } },
        },
      })({ foo: '123' }),
    ).toEqual({
      foo: 'Pattern message',
    })
  })
  test('minLength', () => {
    expect(validator({ address: '1' })).toEqual({
      address: 'Пожалуйста, используйте не менее 3 символов',
    })
  })
  test('maxLength', () => {
    expect(validator({ address: Array.from({ length: 256 }, () => 'a').join('') })).toEqual({
      address: 'Пожалуйста, укоротите этот текст до 255 символов или менее',
    })
  })
  test('equalTo', () => {
    expect(
      validate({
        foo: {
          ...mockSettings,
          validation: { equalTo: { value: 'bar', message: 'Equal message' } },
        },
      })({ foo: '123' }),
    ).toEqual({
      foo: 'Equal message',
    })
  })
  test('notEqualTo', () => {
    expect(
      validate({
        foo: {
          ...mockSettings,
          validation: { notEqualTo: { value: 'bar', message: 'Not equal message' } },
        },
      })({ foo: 'bar' }),
    ).toEqual({
      foo: 'Not equal message',
    })
  })
  test('greaterThan', () => {
    expect(
      validate({
        foo: {
          ...mockSettings,
          validation: { greaterThan: { value: 10, message: 'Greater than message' } },
        },
      })({ foo: 1 }),
    ).toEqual({
      foo: 'Greater than message',
    })
  })
  test('lessThan', () => {
    expect(
      validate({
        foo: {
          ...mockSettings,
          validation: { lessThan: { value: 10, message: 'Less than message' } },
        },
      })({ foo: 11 }),
    ).toEqual({
      foo: 'Less than message',
    })
  })
  test('greaterThanField and lessThanField', () => {
    expect(validator({ priceRubMin: 100000000, priceRubMax: 3000000 })).toEqual({
      priceRubMax: 'Введите цену больше, чем в поле "От"',
      priceRubMin: 'Введите цену меньше, чем в поле "До"',
    })
  })
  test('greaterOrEqualThanField and lessThanOrEqualToField', () => {
    expect(validator({ livingAreaMin: 150, livingAreaMax: 50 })).toEqual({
      livingAreaMax: 'Укажите площадь больше, чем в поле "От"',
      livingAreaMin: 'Укажите площадь меньше, чем в поле "До"',
    })
  })
  test('equalToField', () => {
    expect(
      validate({
        foo: {
          ...mockSettings,
          validation: {
            equalToField: { field: 'bar', message: 'Equal to field message' },
          },
        },
        bar: mockSettings,
      })({ foo: 11, bar: '11' }),
    ).toEqual({
      foo: 'Equal to field message',
    })
  })
  test('notEqualToField', () => {
    expect(
      validate({
        foo: {
          ...mockSettings,
          validation: {
            notEqualToField: { field: 'bar', message: 'Not equal to field message' },
          },
        },
        bar: mockSettings,
      })({ foo: 11, bar: 11 }),
    ).toEqual({
      foo: 'Not equal to field message',
    })
  })
})
