import {
  ComplaintCreateRequest,
  CreateComplaintResponseResponse,
  EmptyBodyResponse,
  CreateComplaintResponseResponseBody,
} from '@/api'
import { removeUndefined } from '@/lib/object'

import { complaintApi } from './complaint.api'

export type ComplaintRequest = ComplaintCreateRequest
export type ComplaintResponseBody = CreateComplaintResponseResponseBody

export type VerifyComplaintRequest = {
  id: number
  smsCode: string
}
const enhanceComplaint = (
  complaint: CreateComplaintResponseResponseBody,
): ComplaintResponseBody => removeUndefined(complaint)

export const createComplaint = async (
  request: ComplaintRequest,
): Promise<CreateComplaintResponseResponse> => {
  let response

  try {
    ;({ response } = await complaintApi.createComplaint(request))
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
    body: enhanceComplaint(response.body),
    errors: response.errors || [],
  }
}

export const verifyComplaint = async ({
  id,
  smsCode,
}: VerifyComplaintRequest): Promise<EmptyBodyResponse> => {
  let response

  try {
    ;({ response } = await complaintApi.verifyComplaint(id, { smsCode }))
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

  return {
    body: response.body,
    errors: response.errors || [],
  }
}
