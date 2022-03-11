import { ApartmentWithAmoHistory, Promo } from '@/api'
import { removeUndefined } from '@/lib/object'

import { apartmentApi } from './apartment.api'

export type ApartmentEntity = ApartmentWithAmoHistory

export const enhanceApartment = (apartment: ApartmentWithAmoHistory): ApartmentEntity =>
  removeUndefined(apartment)

export const getApartment = async (
  apartmentId: number,
  promo: Promo,
): Promise<ApartmentEntity> => {
  const { response } = await apartmentApi.getApartment(apartmentId, promo)
  return enhanceApartment(response.body)
}
