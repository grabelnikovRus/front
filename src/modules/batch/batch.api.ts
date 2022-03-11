import { Configuration, BatchApi } from '@/api'
import { config } from '@/config'

const configuration = new Configuration({
  basePath: config.apiUrl + config.apiBasePath,
  fetchApi: global.fetch.bind(global),
})

export const batchApi = new BatchApi(configuration)
