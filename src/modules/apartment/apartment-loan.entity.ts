import { GetApartmentLoanResponseResponseBody, Promo } from '@/api'
import { removeUndefined } from '@/lib/object'

import { apartmentApi } from '../apartment/apartment.api'

export type ApartmentLoanEntity = GetApartmentLoanResponseResponseBody

export const enhanceApartmentLoan = (
  apartmentLoan: GetApartmentLoanResponseResponseBody,
): ApartmentLoanEntity => removeUndefined(apartmentLoan)

export const getApartmentLoan = async (
  apartmentId: number,
  amount: number,
  duration: number,
  promo: Promo,
): Promise<ApartmentLoanEntity> => {
  const { response } = await apartmentApi.getApartmentLoan(apartmentId, amount, duration, promo)
  if (response === undefined) {
    throw 'No response'
  }
  if (response.body === null) {
    throw response.errors
  }
  return enhanceApartmentLoan(response.body)
}
