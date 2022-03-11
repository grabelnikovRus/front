import { SearchApartmentsResponseV1ResponseBody } from '@/api'
import { removeUndefined } from '@/lib/object'

import { apartmentApi } from '../apartment/apartment.api'

export type SimilarApartmentsEntity = SearchApartmentsResponseV1ResponseBody

export const enhanceSimilarApartments = (
  apartments: SearchApartmentsResponseV1ResponseBody,
): SimilarApartmentsEntity => removeUndefined(apartments)

export const getSimilarApartments = async (
  id: number,
  limit: number,
): Promise<SimilarApartmentsEntity> => {
  const { response } = await apartmentApi.apartmentsSimilarV1IdGet(id, limit)
  if (response === undefined) {
    throw 'No response'
  }
  if (response.body === null) {
    throw response.errors
  }
  return enhanceSimilarApartments(response.body)
}
