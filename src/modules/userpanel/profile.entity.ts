import { Configuration, GetProfileResponseResponseBody, UserpanelApi } from '@/api'
import { config } from '@/config'
import { removeUndefined } from '@/lib/object'

export type ProfileEntity = GetProfileResponseResponseBody

export const enhanceProfile = (profile: GetProfileResponseResponseBody): ProfileEntity =>
  removeUndefined(profile)

export const getProfile = async (token: string): Promise<ProfileEntity> => {
  const configuration = new Configuration({
    basePath: config.apiUrl + config.apiBasePath,
    fetchApi: global.fetch.bind(global),
    accessToken: token,
  })

  const userpanelApi = new UserpanelApi(configuration)

  let response

  try {
    ;({ response } = await userpanelApi.getProfile())
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

  return enhanceProfile(response.body)
}
