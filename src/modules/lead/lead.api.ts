import { Configuration, LeadApi } from '@/api'
import { config } from '@/config'

const configuration = new Configuration({
  basePath: config.apiUrl + config.apiBasePath,
  fetchApi: global.fetch.bind(global),
})

export const leadApi = new LeadApi(configuration)
