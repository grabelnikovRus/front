import { parseMapQuery } from './parse-map-query'

const queryWithoutMapKeys = {
  city: 'Балашиха',
  roominess: '2, 1',
  fullAreaMin: '32',
  fullAreaMax: '55',
}

const queryWithMapKeys = {
  ll: '55.71907215191052, 38.69471473824931',
  z: '12',
}

const normalizeQueryWithMapKeys = {
  ll: [55.71907215191052, 38.69471473824931],
  z: 12,
}

const queryExtended = {
  ...queryWithoutMapKeys,
  ...queryWithMapKeys,
}

test('get raw object query values for map keys', () => {
  expect(parseMapQuery(queryWithMapKeys)).toStrictEqual(queryWithMapKeys)
  expect(parseMapQuery(queryExtended)).toStrictEqual(queryWithMapKeys)
  expect(parseMapQuery(queryWithoutMapKeys)).toStrictEqual({})
  expect(parseMapQuery({})).toStrictEqual({})
})

test('get object query values for map keys with normalize format', () => {
  expect(parseMapQuery(queryWithMapKeys, 'normalize')).toStrictEqual(normalizeQueryWithMapKeys)
  expect(parseMapQuery(queryExtended, 'normalize')).toStrictEqual(normalizeQueryWithMapKeys)
  expect(parseMapQuery(queryWithoutMapKeys, 'normalize')).toStrictEqual({})
  expect(parseMapQuery({}, 'normalize')).toStrictEqual({})
  expect(
    parseMapQuery(
      {
        ll: queryWithMapKeys.ll,
      },
      'normalize',
    ),
  ).toStrictEqual({ ll: normalizeQueryWithMapKeys.ll })
})
