import { GetApartmentMetaResponseResponseBody } from '@/api'
import { removeUndefined } from '@/lib/object'

import { apartmentApi } from '../apartment/apartment.api'

export type ApartmentMetaEntity = GetApartmentMetaResponseResponseBody

export const enhanceApartmentMeta = (
  apartmentMeta: GetApartmentMetaResponseResponseBody,
): ApartmentMetaEntity => removeUndefined(apartmentMeta)

export const getApartmentMeta = async (apartmentId: number): Promise<ApartmentMetaEntity> => {
  const { response } = await apartmentApi.getApartmentMeta(apartmentId)
  if (response === undefined) {
    throw 'No response'
  }
  if (response.body === null) {
    throw response.errors
  }
  return enhanceApartmentMeta(response.body)
}
