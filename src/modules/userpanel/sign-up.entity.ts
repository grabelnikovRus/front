import { SignUpResponseResponseBody, UserpanelSignUpRequest, SignUpResponseResponse } from '@/api'
import { removeUndefined } from '@/lib/object'

import { userpanelApi } from './userpanel.api'

export type SignUpRequest = UserpanelSignUpRequest
export type SignUpResponse = SignUpResponseResponse
export type SignUpResponseBody = SignUpResponseResponseBody

const enhanceSignUp = (contacts: SignUpResponseResponseBody): SignUpResponseBody =>
  removeUndefined(contacts)

export const signUp = async (request: SignUpRequest): Promise<SignUpResponse> => {
  let response

  try {
    ;({ response } = await userpanelApi.signUp(request))
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
    body: enhanceSignUp(response.body),
    errors: response.errors || [],
  }
}
