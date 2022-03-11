import {
  GetContactsResponseResponseFromJSONTyped,
  GetMenuResponseResponseFromJSONTyped,
  GetPagesResponseResponseFromJSONTyped,
  GetWidgetsResponseResponseFromJSONTyped,
  GetApartmentMetaResponseResponseFromJSONTyped,
  SearchApartmentsResponseV1ResponseFromJSONTyped,
  Promo,
} from '@/api'
import { APARTMENTS_SIMILAR_LIMIT } from '@/config'
import { interpolate } from '@/lib/string'
import { enhanceSimilarApartments, SimilarApartmentsEntity } from '@/modules/apartment'
import { ApartmentMetaEntity, enhanceApartmentMeta } from '@/modules/apartment-meta'
import { batchApi } from '@/modules/batch/batch.api'
import { ContactsEntity, enhanceContacts } from '@/modules/contacts'
import { MenuEntity } from '@/modules/menu'
import { enhanceMenu } from '@/modules/menu/menu.entity'
import { enhancePages, PagesEntity } from '@/modules/pages'
import { enhanceWidgets, WidgetsEntity } from '@/modules/widgets'

import {
  API_CONTACTS,
  API_MENUS,
  API_PAGES,
  API_WIDGETS,
  API_APARTMENT_META,
  API_SIMILAR_APARTMENTS,
} from './endpoints'

type ApartmentBatchEntity = [
  ContactsEntity,
  MenuEntity,
  PagesEntity,
  WidgetsEntity,
  ApartmentMetaEntity,
  SimilarApartmentsEntity,
]

const enhanceBatch = (batch?: object[]): ApartmentBatchEntity => {
  if (!batch) {
    throw 'Empty batch response'
  }
  const [contacts, menu, pages, widgets, apartmentMeta, similarApartments] = batch
  return [
    enhanceContacts(GetContactsResponseResponseFromJSONTyped(contacts, false).body),
    enhanceMenu(GetMenuResponseResponseFromJSONTyped(menu, false).body),
    enhancePages(GetPagesResponseResponseFromJSONTyped(pages, false).body),
    enhanceWidgets(GetWidgetsResponseResponseFromJSONTyped(widgets, false).body),
    enhanceApartmentMeta(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      GetApartmentMetaResponseResponseFromJSONTyped(apartmentMeta, false).body!,
    ),
    enhanceSimilarApartments(
      SearchApartmentsResponseV1ResponseFromJSONTyped(similarApartments, false).body,
    ),
  ]
}

export const getApartmentBatch = async (
  apartmentId: number,
  promo: Promo,
): Promise<ApartmentBatchEntity> => {
  const { response } = await batchApi.batch({
    batch: [
      { method: 'GET', path: API_CONTACTS },
      { method: 'GET', path: API_MENUS },
      { method: 'GET', path: API_PAGES },
      { method: 'GET', path: API_WIDGETS },
      { method: 'GET', path: interpolate(API_APARTMENT_META, { id: apartmentId }) },
      {
        method: 'GET',
        path: interpolate(API_SIMILAR_APARTMENTS, { id: apartmentId }),
        params: { limit: APARTMENTS_SIMILAR_LIMIT, promo },
      },
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
