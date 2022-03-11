import { CatalogSettingsNew } from '@/api'
import { removeUndefined } from '@/lib/object'

import { settingsApi } from './settings.api'

export type CatalogSettingsEntity = CatalogSettingsNew

export const enhanceCatalogSettings = (
  catalogSettings: CatalogSettingsNew,
): CatalogSettingsEntity => removeUndefined(catalogSettings)

export const getCatalogSettings = async (): Promise<CatalogSettingsEntity> => {
  const { response } = await settingsApi.getCatalogSettingsNew()
  if (response === undefined) {
    throw 'No response'
  }
  return enhanceCatalogSettings(response.body)
}
