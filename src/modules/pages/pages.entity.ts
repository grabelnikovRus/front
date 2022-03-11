import { GetPagesResponseResponseBody, PageInfoShort } from '@/api'
import { removeUndefined } from '@/lib/object'

export type PagesEntity = PageInfoShort[]

export const enhancePages = ({ pages }: GetPagesResponseResponseBody): PagesEntity => {
  const enhancedPages = pages ?? []
  return removeUndefined(enhancedPages)
}
