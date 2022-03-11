import { CatalogSettings } from '@/api'
import { removeUndefined } from '@/lib/object'

import { settingsApi } from './settings.api'

export type CatalogSettingsEntity = CatalogSettings

export const enhanceCatalogSettings = (catalogSettings: CatalogSettings): CatalogSettingsEntity =>
  removeUndefined(catalogSettings)

export const getCatalogSettings = async (): Promise<CatalogSettingsEntity> => {
  const { response } = await settingsApi.getCatalogSettings()
  if (response === undefined) {
    throw 'No response'
  }
  return enhanceCatalogSettings(response.body)
}
