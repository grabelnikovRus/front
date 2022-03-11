import {
  ApartmentsFilters,
  ApartmentsFiltersBalconyTypeEnum,
  ApartmentsFiltersBuildingCeilingHeightEnum,
  ApartmentsFiltersBuildingGarbageChuteEnum,
  ApartmentsFiltersElevatorTypeEnum,
  ApartmentsFiltersWcsTypeEnum,
  ApartmentsFiltersToponym,
} from '@/api'
import { removeUndefined } from '@/lib/object'

export type ApartmentsFilter = ApartmentsFilters

const normalizeString = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined

const normalizeNumber = (value: unknown, multiplier = 1): number | undefined => {
  if (typeof value === 'number') {
    return value * multiplier
  }
  if (typeof value === 'string') {
    return Number(value) * multiplier
  }
  return undefined
}

const normalizeArray = (value: unknown): string[] | undefined =>
  Array.isArray(value) ? value : normalizeString(value)?.split(',')

const normalizeObjectsArray = (value: unknown): ApartmentsFiltersToponym[] | undefined => {
  const normilize = normalizeString(value)
    ?.split(',')
    .map((value) => Object.fromEntries(new URLSearchParams(value)))

  return Array.isArray(value) ? value : normilize
}

export const defaultFilter: ApartmentsFilter = {}

export const isDefaultFilter = (filter: ApartmentsFilter): boolean =>
  JSON.stringify(filter) === JSON.stringify(defaultFilter)

export const normalizeApartmentsFilter = (
  query: Record<string, unknown> | ApartmentsFilters,
): ApartmentsFilters => {
  const filter: ApartmentsFilters = {
    address: normalizeString(query.address),
    balconyType: normalizeArray(query.balconyType) as ApartmentsFiltersBalconyTypeEnum[],
    buildingCeilingHeight: normalizeArray(
      query.buildingCeilingHeight,
    ) as ApartmentsFiltersBuildingCeilingHeightEnum[],
    buildingFloorCountMax: normalizeNumber(query.buildingFloorCountMax),
    buildingFloorCountMin: normalizeNumber(query.buildingFloorCountMin),
    buildingGarbageChute: normalizeArray(
      query.buildingGarbageChute,
    ) as ApartmentsFiltersBuildingGarbageChuteEnum[],
    buildingParkingTypes: normalizeArray(query.buildingParkingTypes),
    buildingTypes: normalizeArray(query.buildingTypes),
    city: normalizeString(query.city),
    toponym: normalizeObjectsArray(query.toponym),
    decorationTypes: normalizeArray(query.decorationTypes),
    elevatorType: normalizeArray(query.elevatorType) as ApartmentsFiltersElevatorTypeEnum[],
    floorNumberMax: normalizeNumber(query.floorNumberMax),
    floorNumberMin: normalizeNumber(query.floorNumberMin),
    fullAreaMax: normalizeNumber(query.fullAreaMax),
    fullAreaMin: normalizeNumber(query.fullAreaMin),
    housingTypes: normalizeArray(query.housingTypes),
    kitchensAreaMax: normalizeNumber(query.kitchensAreaMax),
    kitchensAreaMin: normalizeNumber(query.kitchensAreaMin),
    livingAreaMax: normalizeNumber(query.livingAreaMax),
    livingAreaMin: normalizeNumber(query.livingAreaMin),
    loanRateMax: normalizeNumber(query.loanRateMax),
    loanRateMin: normalizeNumber(query.loanRateMin),
    priceRubMax: normalizeNumber(query.priceRubMax),
    priceRubMin: normalizeNumber(query.priceRubMin),
    roominess: normalizeArray(query.roominess),
    wcsType: normalizeArray(query.wcsType) as ApartmentsFiltersWcsTypeEnum[],
    windowViewTypes: normalizeArray(query.windowViewTypes),
  }
  return removeUndefined(filter)
}

const denormalizeNumber = (value?: number, divider = 1): string | undefined =>
  typeof value === 'number' ? String(value / divider) : undefined

const denormalizeArray = (value?: string[]): string | undefined =>
  Array.isArray(value) ? value.join(',') : value

export const denormalizeApartmentsFilter = (
  filter: ApartmentsFilters,
): Record<string, string> => {
  const query = {
    address: filter.address,
    balconyType: denormalizeArray(filter.balconyType),
    buildingCeilingHeight: denormalizeArray(filter.buildingCeilingHeight),
    buildingFloorCountMax: denormalizeNumber(filter.buildingFloorCountMax),
    buildingFloorCountMin: denormalizeNumber(filter.buildingFloorCountMin),
    buildingGarbageChute: denormalizeArray(filter.buildingGarbageChute),
    buildingParkingTypes: denormalizeArray(filter.buildingParkingTypes),
    buildingTypes: denormalizeArray(filter.buildingTypes),
    city: filter.city,
    decorationTypes: denormalizeArray(filter.decorationTypes),
    elevatorType: denormalizeArray(filter.elevatorType),
    floorNumberMax: denormalizeNumber(filter.floorNumberMax),
    floorNumberMin: denormalizeNumber(filter.floorNumberMin),
    fullAreaMax: denormalizeNumber(filter.fullAreaMax),
    fullAreaMin: denormalizeNumber(filter.fullAreaMin),
    housingTypes: denormalizeArray(filter.housingTypes),
    kitchensAreaMax: denormalizeNumber(filter.kitchensAreaMax),
    kitchensAreaMin: denormalizeNumber(filter.kitchensAreaMin),
    livingAreaMax: denormalizeNumber(filter.livingAreaMax),
    livingAreaMin: denormalizeNumber(filter.livingAreaMin),
    loanRateMax: denormalizeNumber(filter.loanRateMax),
    loanRateMin: denormalizeNumber(filter.loanRateMin),
    priceRubMax: denormalizeNumber(filter.priceRubMax),
    priceRubMin: denormalizeNumber(filter.priceRubMin),
    roominess: denormalizeArray(filter.roominess),
    wcsType: denormalizeArray(filter.wcsType),
    windowViewTypes: denormalizeArray(filter.windowViewTypes),
  }
  return removeUndefined(query) as Record<string, string>
}

export const dropEmptyFields = (values: ApartmentsFilter): ApartmentsFilter => {
  const queryString = Object.entries(values).reduce(
    (accum, entry) =>
      (
        Array.isArray(entry[1])
          ? entry[1]?.some(
              (value) =>
                value &&
                value !== '00000000-0000-0000-0000-000000000000' &&
                value !== 'no-matter',
            )
          : entry[1]
      )
        ? {
            ...accum,
            ...{ [entry[0]]: entry[1] },
          }
        : accum,
    defaultFilter,
  )

  if (!queryString.city) delete queryString.city

  return queryString
}
