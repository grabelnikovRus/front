import { LogInResponseResponseBody, UserpanelLogInRequest, LogInResponseResponse } from '@/api'
import { removeUndefined } from '@/lib/object'

import { userpanelApi } from './userpanel.api'

export type LoginRequest = UserpanelLogInRequest
export type LoginResponse = LogInResponseResponse
export type LoginResponseBody = LogInResponseResponseBody

const enhanceLogin = (contacts: LogInResponseResponseBody): LoginResponseBody =>
  removeUndefined(contacts)

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  let response

  try {
    ;({ response } = await userpanelApi.logIn(request))
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
    body: enhanceLogin(response.body),
    errors: response.errors || [],
  }
}
