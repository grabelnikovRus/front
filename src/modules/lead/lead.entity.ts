import {
  CreateLeadRequest,
  EmptyBodyResponse,
  CreateLeadResponseResponse,
  CreateLeadResponseResponseBody,
} from '@/api'
import { removeUndefined } from '@/lib/object'

import { leadApi } from './lead.api'

export type LeadRequest = CreateLeadRequest
export type LeadResponse = CreateLeadResponseResponse
export type LeadResponseBody = CreateLeadResponseResponseBody

export type VerifyLeadRequest = {
  id: number
  smsCode: string
}
export type VerifyLeadResponse = EmptyBodyResponse

const enhanceLead = (contacts: CreateLeadResponseResponseBody): LeadResponseBody =>
  removeUndefined(contacts)

export const createLead = async (request: LeadRequest): Promise<LeadResponse> => {
  let response

  try {
    ;({ response } = await leadApi.createLead(request))
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
    body: enhanceLead(response.body),
    errors: response.errors || [],
  }
}

export const verifyLead = async ({
  id,
  smsCode,
}: VerifyLeadRequest): Promise<VerifyLeadResponse> => {
  const { response } = await leadApi.verifyLead(id, { smsCode })

  if (response === undefined) {
    throw 'No response'
  }

  return response
}
