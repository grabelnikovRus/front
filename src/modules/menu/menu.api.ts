import { Configuration, MenuApi } from '@/api'
import { config } from '@/config'

const configuration = new Configuration({
  basePath: config.apiUrl + config.apiBasePath,
  fetchApi: global.fetch.bind(global),
})

export const menuApi = new MenuApi(configuration)
