import { useQuery, UseQueryResult } from 'react-query'

import { Promo } from '@/api'

import { getCountApartments } from './counter.entity'
import { ApartmentsFilter, defaultFilter } from './filter.entity'

export const useApartmentsCounter = (
  filter: ApartmentsFilter,
  promo: Promo,
  initialCounter: number,
  enabled = true,
): UseQueryResult<number> => {
  const clearedFilter = { ...filter, ...defaultFilter }
  return useQuery(
    ['apartments-counter', clearedFilter],
    () => getCountApartments(clearedFilter, promo),
    {
      initialData: initialCounter,
      enabled,
    },
  )
}
