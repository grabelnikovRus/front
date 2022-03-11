import { Configuration, ApartmentMapApi } from '@/api'
import { config } from '@/config'

const configuration = new Configuration({
  basePath: config.apiUrl + config.apiBasePath,
  fetchApi: global.fetch.bind(global),
})

export const mapApi = new ApartmentMapApi(configuration)
