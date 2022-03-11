import {
  GetCatalogSettingsResponseNewResponseFromJSONTyped,
  GetContactsResponseResponseFromJSONTyped,
  GetMenuResponseResponseFromJSONTyped,
  GetPageResponseResponseFromJSONTyped,
  GetPagesResponseResponseFromJSONTyped,
  GetWidgetsResponseResponseFromJSONTyped,
  Promo,
  SearchApartmentsResponseV1ResponseFromJSONTyped,
} from '@/api'
import { PAGE, CATALOG } from '@/config'
import { interpolate } from '@/lib/string'
import {
  ApartmentsEntity,
  enhanceApartments,
  ApartmentsFilter,
  ApartmentsSort,
} from '@/modules/apartments-v1'
import { batchApi } from '@/modules/batch/batch.api'
import { ContactsEntity, enhanceContacts } from '@/modules/contacts'
import { MenuEntity } from '@/modules/menu'
import { enhanceMenu } from '@/modules/menu/menu.entity'
import { enhancePage, enhancePages, PageEntity, PagesEntity } from '@/modules/pages'
import { CatalogSettingsEntity, enhanceCatalogSettings } from '@/modules/settings-v1'
import { enhanceWidgets, WidgetsEntity } from '@/modules/widgets'

import {
  API_APARTMENTS_V1,
  API_CONTACTS,
  API_MENUS,
  API_PAGE_WIDGETS,
  API_PAGES,
  API_SETTINGS_CATALOG_V1,
  API_WIDGETS,
} from './endpoints'

type CatalogBatchEntity = [
  ApartmentsEntity,
  ContactsEntity,
  MenuEntity,
  PageEntity,
  PagesEntity,
  CatalogSettingsEntity,
  WidgetsEntity,
]

const enhanceBatch = (batch?: object[]): CatalogBatchEntity => {
  if (!batch) {
    throw 'Empty batch response'
  }
  const [apartments, contacts, menu, page, pages, catalogSettings, widgets] = batch
  return [
    enhanceApartments(SearchApartmentsResponseV1ResponseFromJSONTyped(apartments, false).body),
    enhanceContacts(GetContactsResponseResponseFromJSONTyped(contacts, false).body),
    enhanceMenu(GetMenuResponseResponseFromJSONTyped(menu, false).body),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    enhancePage(GetPageResponseResponseFromJSONTyped(page, false).body!),
    enhancePages(GetPagesResponseResponseFromJSONTyped(pages, false).body),
    enhanceCatalogSettings(
      GetCatalogSettingsResponseNewResponseFromJSONTyped(catalogSettings, false).body,
    ),
    enhanceWidgets(GetWidgetsResponseResponseFromJSONTyped(widgets, false).body),
  ]
}

export const getCatalogBatch = async (
  filter: ApartmentsFilter,
  sort: ApartmentsSort,
  promo: Promo,
): Promise<CatalogBatchEntity> => {
  const { response } = await batchApi.batch({
    batch: [
      {
        method: 'POST',
        path: API_APARTMENTS_V1,
        body: { filter },
        params: {
          ...sort,
          page: CATALOG.PAGE_INITIAL,
          perPage: CATALOG.PER_PAGE,
          promo,
        },
      },
      { method: 'GET', path: API_CONTACTS },
      { method: 'GET', path: API_MENUS },
      { method: 'GET', path: interpolate(API_PAGE_WIDGETS, { slug: PAGE.SLUG_CATALOG }) },
      { method: 'GET', path: API_PAGES },
      { method: 'GET', path: API_SETTINGS_CATALOG_V1 },
      { method: 'GET', path: API_WIDGETS },
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
