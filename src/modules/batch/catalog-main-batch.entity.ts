import {
  GetCatalogSettingsResponseNewResponseFromJSONTyped,
  SearchApartmentsResponseV1ResponseFromJSONTyped,
} from '@/api'
import { CATALOG } from '@/config'
import { ApartmentsEntity, enhanceApartments, defaultFilter } from '@/modules/apartments-v1'
import { batchApi } from '@/modules/batch/batch.api'
import { CatalogSettingsEntity, enhanceCatalogSettings } from '@/modules/settings-v1'

import { API_APARTMENTS_V1, API_SETTINGS_CATALOG_V1 } from './endpoints'

type CatalogMainBatchEntity = [ApartmentsEntity, CatalogSettingsEntity]

const enhanceBatch = (batch?: object[]): CatalogMainBatchEntity => {
  if (!batch) {
    throw 'Empty batch response'
  }

  const [apartments, catalogSettings] = batch
  return [
    enhanceApartments(SearchApartmentsResponseV1ResponseFromJSONTyped(apartments, false).body),
    enhanceCatalogSettings(
      GetCatalogSettingsResponseNewResponseFromJSONTyped(catalogSettings, false).body,
    ),
  ]
}

export const getCatalogMainBatch = async (): Promise<CatalogMainBatchEntity> => {
  const { response } = await batchApi.batch({
    batch: [
      {
        method: 'POST',
        path: API_APARTMENTS_V1,
        body: { filter: defaultFilter },
        params: {
          page: CATALOG.PAGE_INITIAL,
          perPage: CATALOG.PER_PAGE,
        },
      },
      { method: 'GET', path: API_SETTINGS_CATALOG_V1 },
    ],
  })
  if (response === undefined) {
    throw 'No response'
  }
  if (response.body === undefined || response.body === null) {
    throw 'No response body'
  }
  return enhanceBatch(response.body.batch)
}
