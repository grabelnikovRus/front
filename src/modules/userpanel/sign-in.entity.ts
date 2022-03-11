import { SignUpResponseResponseBody, UserpanelSignInRequest, SignUpResponseResponse } from '@/api'
import { removeUndefined } from '@/lib/object'

import { userpanelApi } from './userpanel.api'

export type SignInRequest = UserpanelSignInRequest
export type SignInResponse = SignUpResponseResponse
export type SignInResponseBody = SignUpResponseResponseBody

const enhanceSignIn = (contacts: SignUpResponseResponseBody): SignInResponseBody =>
  removeUndefined(contacts)

export const signIn = async (request: SignInRequest): Promise<SignInResponse> => {
  let response

  try {
    ;({ response } = await userpanelApi.signIn(request))
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
    body: enhanceSignIn(response.body),
    errors: response.errors || [],
  }
}
