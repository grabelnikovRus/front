import {
  ApartmentsFilters,
  ApartmentsMapResponseV2,
  ApartmentsMapResponseV2ResponseBody,
} from '@/api'

import { mapApi } from './map.api'

const extractApatments = (response: ApartmentsMapResponseV2) => response.response.body

export const getApartmentsMap = async (
  value: number[][],
  filter: ApartmentsFilters,
): Promise<ApartmentsMapResponseV2ResponseBody> => {
  const apartmentMap = {
    filter: {
      ...filter,
      boundingBox: {
        lowLeftLong: value[0][0],
        lowLeftLat: value[0][1],
        upRightLong: value[1][0],
        upRightLat: value[1][1],
      },
    },
  }

  const response = await mapApi.apartmentsMap(apartmentMap)

  return extractApatments(response)
}
