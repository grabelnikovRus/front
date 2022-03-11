import { CoordsCheckerResponseResponse, CheckCoordsRequest } from '@/api'

import { defaultApi } from './coords.api'

export const checkCoords = async ({
  longitude,
  latitude,
}: CheckCoordsRequest): Promise<CoordsCheckerResponseResponse> => {
  let response

  try {
    ;({ response } = await defaultApi.checkCoords(longitude, latitude))
  } catch (err: unknown) {
    if (err instanceof Response) {
      const {
        response: { errors },
      } = await err.json()
      throw errors
    }
  }
  if (response === undefined) {
    throw 'No response'
  }
  if (response.body === undefined || response.body === null) {
    throw 'No response body'
  }

  return response
}
