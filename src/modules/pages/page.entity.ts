import { GetPageResponseResponseBody, PageInfo, Widget } from '@/api'
import { removeUndefined } from '@/lib/object'

import { pagesApi } from './pages.api'

export interface PageEntity {
  pageInfo: PageInfo
  widgets: Widget[]
}

export const enhancePage = ({ page, widgets }: GetPageResponseResponseBody): PageEntity => {
  const enhancedPage = { pageInfo: page, widgets }
  return removeUndefined(enhancedPage)
}

export const getPage = async (slug: string): Promise<PageEntity> => {
  const { response } = await pagesApi.getPage(slug)
  if (response === undefined) {
    throw 'No response'
  }
  if (response.body === null) {
    throw response.errors
  }
  return enhancePage(response.body)
}
