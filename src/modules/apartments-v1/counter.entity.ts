import { Promo, SearchApartmentsResponseV1ResponseBody } from '@/api'
import { CATALOG } from '@/config'
import { ApartmentsFilter } from '@/modules/apartments-v1/filter.entity'
import { ApartmentsSort } from '@/modules/apartments-v1/sort.entity'

import { apartmentApi } from '../apartment/apartment.api'

const extractCounter = ({ count }: SearchApartmentsResponseV1ResponseBody): number => count ?? 0

export const getCountApartments = async (
  filter: ApartmentsFilter,
  promo: Promo,
  sort?: ApartmentsSort,
  page = CATALOG.PAGE_INITIAL as number,
): Promise<number> => {
  const { response } = await apartmentApi.searchApartmentsV1(
    page,
    CATALOG.PER_PAGE,
    { filter },
    sort?.sortBy,
    sort?.sortOrder,
    promo,
  )
  return extractCounter(response.body)
}
