import { InfrastructureResponseResponseBodyInfrastructure } from '@/api'
import { removeUndefined } from '@/lib/object'

import { infrastructureApi } from './infrastructure.api'

export type InfrastructureEntity = InfrastructureResponseResponseBodyInfrastructure

export const enhanceInfrastructure = (
  infrastructure: InfrastructureResponseResponseBodyInfrastructure[],
): InfrastructureEntity[] => removeUndefined(infrastructure)

export const getApartment = async (): Promise<InfrastructureEntity[]> => {
  const { response } = await infrastructureApi.getInfrastructure()
  if (response === undefined) {
    throw 'No response'
  }
  return enhanceInfrastructure(response.body.infrastructure)
}
