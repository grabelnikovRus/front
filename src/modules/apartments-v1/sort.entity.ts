import { SortBy, SortOrder } from '@/api'
import { removeUndefined } from '@/lib/object'

export interface ApartmentsSort {
  sortBy?: SortBy
  sortOrder?: SortOrder
}

const normalizeString = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined

export const defaultSort = {
  sortBy: SortBy.CreatedAt,
  sortOrder: SortOrder.Desc,
}

export const normalizeApartmentsSort = (
  query: Record<string, unknown> | ApartmentsSort,
): ApartmentsSort => {
  const sort: ApartmentsSort = {
    sortBy: normalizeString(query.sortBy) as SortBy,
    sortOrder: normalizeString(query.sortOrder) as SortOrder,
  }
  return removeUndefined(sort)
}

export const denormalizeApartmentsSort = (sort: ApartmentsSort): Record<string, string> => {
  const query = {
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
  }
  return removeUndefined(query) as Record<string, string>
}
