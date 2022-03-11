import {
  GetContactsResponseResponseFromJSONTyped,
  GetMenuResponseResponseFromJSONTyped,
  GetPagesResponseResponseFromJSONTyped,
  GetWidgetsResponseResponseFromJSONTyped,
} from '@/api'
import { batchApi } from '@/modules/batch/batch.api'
import { ContactsEntity, enhanceContacts } from '@/modules/contacts'
import { MenuEntity } from '@/modules/menu'
import { enhanceMenu } from '@/modules/menu/menu.entity'
import { enhancePages, PagesEntity } from '@/modules/pages'
import { enhanceWidgets, WidgetsEntity } from '@/modules/widgets'

import { API_CONTACTS, API_MENUS, API_PAGES, API_WIDGETS } from './endpoints'

type AliasBatchEntity = [ContactsEntity, MenuEntity, PagesEntity, WidgetsEntity]

const enhanceBatch = (batch?: object[]): AliasBatchEntity => {
  if (!batch) {
    throw 'Empty batch response'
  }
  const [contacts, menu, pages, widgets] = batch
  return [
    enhanceContacts(GetContactsResponseResponseFromJSONTyped(contacts, false).body),
    enhanceMenu(GetMenuResponseResponseFromJSONTyped(menu, false).body),
    enhancePages(GetPagesResponseResponseFromJSONTyped(pages, false).body),
    enhanceWidgets(GetWidgetsResponseResponseFromJSONTyped(widgets, false).body),
  ]
}

export const getAliasBatch = async (): Promise<AliasBatchEntity> => {
  const { response } = await batchApi.batch({
    batch: [
      { method: 'GET', path: API_CONTACTS },
      { method: 'GET', path: API_MENUS },
      { method: 'GET', path: API_PAGES },
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
