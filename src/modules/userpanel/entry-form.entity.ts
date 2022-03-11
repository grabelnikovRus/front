import {
  SignUpResponseResponse,
  UserpanelEnterWithCheckListRequest,
  SignUpResponseResponseBody,
} from '@/api'
import { removeUndefined } from '@/lib/object'

import { userpanelApi } from './userpanel.api'

export type SaleApplicationRequest = UserpanelEnterWithCheckListRequest
export type SaleApplicationResponseBody = SignUpResponseResponseBody

const enhanceSaleApplication = (
  saleApplication: SignUpResponseResponseBody,
): SaleApplicationResponseBody => removeUndefined(saleApplication)

export const getSaleApplication = async (
  application: SaleApplicationRequest,
): Promise<SignUpResponseResponse> => {
  let response

  try {
    ;({ response } = await userpanelApi.enterWithCheckList(application))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const {
      response: { errors },
    } = await err.json()
    throw errors
  }
  if (response === undefined) {
    throw 'No response'
  }
  if (response.body === undefined || response.body === null) {
    throw 'No response body'
  }

  return {
    body: enhanceSaleApplication(response.body),
    errors: response.errors || [],
  }
}
