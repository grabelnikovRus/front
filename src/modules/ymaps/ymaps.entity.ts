import {
  ICity,
  IAddressSection,
  IAddressSuggest,
  YmapsSuggestResponseResult,
} from '@/types/ymaps-suggest'

const kindHumanized: { [key: string]: string } = {
  metro: 'Метро',
  other: 'Другие результаты',
  street: 'Адреса',
}

const REQUEST_URL = '/ymaps-suggest/suggest-geo'

const prepareAddressSuggestionDisplayNamev7 = (result: YmapsSuggestResponseResult): string => {
  let area = result.desc

  if (result.desc.includes('Москва, Россия')) {
    area = result.desc.match(/^(.*Москва), Россия/i)?.pop() ?? result.desc
  } else if (result.desc.includes('Московская область')) {
    area = result.desc.match(/^(.+), Московская область/i)?.pop() ?? result.desc
  }

  return `${area}, ${result.name.replace('улица ', '')}`
}

const prepareAddressSuggestionDisplayNamev8 = (result: YmapsSuggestResponseResult): string =>
  result.name
    .replace(/, Московская область$/, '')
    .replace(/^улица /i, '')
    .replace(/ улица/gi, '')

export const getYmapsSuggestPlace = async (
  request: string,
  city: ICity,
): Promise<IAddressSection[]> => {
  let bbox

  if (city?.bbox) {
    const { bbox1_longitude, bbox1_latitude, bbox2_longitude, bbox2_latitude } = city.bbox

    bbox = [bbox1_longitude, bbox1_latitude, bbox2_longitude, bbox2_latitude].join(',')
  }

  const params = {
    bbox,
    lang: 'ru_RU',
    local_only: 0,
    n: 20,
    origin: 'jsapi2Geocoder',
    // про : При пустом запросе отправится только город и это хорошо.
    // part: При выборе «Москва и МО» city.name будет "" и это тоже хорошо — там хватит bbox
    part: [city.name, request].filter((elem) => Boolean(elem)).join(', '),
    search_type: 'tp',
    v: 7,
  }

  const paramsString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  const url = `${REQUEST_URL}?${paramsString}`

  return fetch(url)
    .then((response) => response.text())
    .then((res: string) => {
      const sectionedResults: { [key: string]: IAddressSuggest[] } = {}

      if (!res) return []

      const data = JSON.parse(res.split('suggest.apply(')[1].slice(0, -1))

      data.results
        ?.filter((result: YmapsSuggestResponseResult) =>
          city.name.length
            ? result.desc?.includes(city.name)
            : result.desc?.includes('Москва') || result.desc?.includes('Московская область'),
        )
        .forEach((result: YmapsSuggestResponseResult) => {
          const checkOtherType = [
            'station',
            'railway',
            'railway_station',
            'province',
            'district',
            'route',
          ].includes(result.kind)
          const key = ['street', 'metro'].includes(result.kind)
            ? result.kind
            : checkOtherType
            ? 'other'
            : null

          if (!key) return

          if (!sectionedResults[key]) sectionedResults[key] = []
          sectionedResults[key].push({
            displayName: prepareAddressSuggestionDisplayNamev7(result),
            lat: result.lat,
            lon: result.lon,
            toponym: result,
            value: result.name.replace('улица ', '').replace(' улица', ''),
          })
        })

      const sections = ['street', 'metro', 'other']
        .map((sectionKey) => ({
          title: kindHumanized[sectionKey] ?? sectionKey,
          places: sectionedResults[sectionKey] ?? [],
        }))
        .filter((el) => el.places.length)

      return sections
    })
}

export function getAddressSuggestions(request: string): Promise<IAddressSuggest[]> {
  const params = {
    bbox: ['36.876232', '56.102350', '38.353893', '55.317737'].join(','),
    lang: 'ru_RU',
    local_only: 0,
    n: 20,
    origin: 'jsapi2Geocoder',
    part: request || '',
    search_type: 'tp',
    v: 8,
  }

  const paramsString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  const url = `${REQUEST_URL}?${paramsString}`
  return fetch(url)
    .then((response) => response.json())
    .then((res: [string, YmapsSuggestResponseResult[]]) => {
      if (!res) return []

      return (
        res[1]
          .filter(
            (result) =>
              result.kind === 'house' &&
              (result.name.includes('Москва') || result.name.includes('Московская область')),
          )
          .map((result) => ({
            displayName: prepareAddressSuggestionDisplayNamev8(result),
            value: String(result.geoid),
            lat: result.lat,
            lon: result.lon,
          })) ?? []
      )
    })
}
