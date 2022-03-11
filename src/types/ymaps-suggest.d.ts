/* eslint-disable no-use-before-define */
/** @format */

import { httpStatusType } from './http-status-type'

// @see https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/suggest.html
export interface YmapsSuggest {
  displayName: string
  value: string
}
export interface YmapsSuggestRequest {
  bbox: string
  lang: string
  local_only: number
  n: number
  origin: string
  part: string
  search_type: string
  v: number
}
export interface YmapsSuggestResponse {
  data: YmapsSuggestResponseRaw
  errors: []
  status: httpStatusType
}
export interface YmapsSuggestResponseRaw {
  part: string
  results: YmapsSuggestResponseResult[]
}
export interface YmapsSuggestResponseResult {
  desc: string
  geoid: number
  // @see https://yandex.ru/dev/maps/geocoder/doc/desc/reference/kind.html
  kind:
    | 'airport'
    | 'area'
    | 'country'
    | 'district'
    | 'entrance'
    | 'house'
    | 'hydro'
    | 'metro'
    | 'locality'
    | 'other'
    | 'province'
    | 'railway'
    //| "railway_station"
    | 'region'
    | 'route'
    | 'station'
    | 'street'
    | 'vegetation'
  lat: number
  lon: number
  name: string
  type: 'geo'
}

export interface ICity {
  name: string
  bbox?: {
    bbox1_latitude: number
    bbox1_longitude: number
    bbox2_latitude: number
    bbox2_longitude: number
  }
}

export interface IAddressSection {
  title: string
  places: IAddressSuggest[]
}
export interface IAddressSuggest {
  displayName: string
  value: string
  lat: number
  lon: number
  toponym?: YmapsSuggestResponseResult
}
