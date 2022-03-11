import { Promo, SearchApartmentsResponseV1ResponseBody } from '@/api'
import { CATALOG } from '@/config'
import { removeUndefined } from '@/lib/object'

import { ApartmentsFilter } from './filter.entity'
import { ApartmentsSort } from './sort.entity'

import { apartmentApi } from '../apartment/apartment.api'

export type ApartmentsEntity = SearchApartmentsResponseV1ResponseBody

export const enhanceApartments = (
  apartments: SearchApartmentsResponseV1ResponseBody,
): ApartmentsEntity => removeUndefined(apartments)

export const getApartments = async (
  filter: ApartmentsFilter,
  promo: Promo,
  sort?: ApartmentsSort,
  page = CATALOG.PAGE_INITIAL as number,
): Promise<ApartmentsEntity> => {
  const { response } = await apartmentApi.searchApartmentsV1(
    page,
    CATALOG.PER_PAGE,
    { filter },
    sort?.sortBy,
    sort?.sortOrder,
    promo,
  )

  return enhanceApartments(response.body)
}
