/*!
  This file is being used for all the apartment modules.
  Please do not delete it.
*/

import { Configuration, ApartmentApi } from '@/api'
import { config } from '@/config'

const configuration = new Configuration({
  basePath: config.apiUrl + config.apiBasePath,
  fetchApi: global.fetch.bind(global),
})

export const apartmentApi = new ApartmentApi(configuration)
