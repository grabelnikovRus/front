import { GetServerSideProps } from 'next'
import { VFC } from 'react'

import { Promo } from '@/api'
import { Maps, Layout, Meta } from '@/components'
import { SLUG, config } from '@/config'
import { removeUndefined } from '@/lib/object'
import {
  ApartmentsEntity,
  ApartmentsFilter,
  normalizeApartmentsFilter,
  normalizeApartmentsSort,
} from '@/modules/apartments-v1'
import { getCatalogBatch } from '@/modules/batch/catalog-batch-v1.entity'
import { ContactsEntity } from '@/modules/contacts'
import { MenuEntity } from '@/modules/menu'
import { PageEntity, PagesEntity } from '@/modules/pages'
import { CatalogSettingsEntity } from '@/modules/settings-v1'
import { getProfile, ProfileEntity } from '@/modules/userpanel'
import { WidgetsEntity } from '@/modules/widgets'

export interface CatalogMapProps {
  page: PageEntity
  pages: PagesEntity
  contacts: ContactsEntity
  apartments: ApartmentsEntity
  catalogSettings: CatalogSettingsEntity
  widgets: WidgetsEntity
  menu: MenuEntity
  filter: ApartmentsFilter
  profile?: ProfileEntity
}

const CatalogMap: VFC<CatalogMapProps> = ({
  page,
  pages,
  contacts,
  apartments,
  widgets,
  menu,
  catalogSettings,
  filter,
  profile,
}) => {
  const { pageInfo, widgets: pageWidgets } = page

  return (
    <>
      <Meta
        title={pageInfo.metaTitle}
        origin={`${config.siteOrigin}/catalog-map`}
        description={pageInfo.metaDescription}
        openGraph={{
          title: pageInfo.ogTitle,
          description: pageInfo.ogDescription,
        }}
      />
      <Layout
        contacts={contacts}
        menus={menu}
        pages={pages}
        widgets={widgets}
        pageSlug={SLUG.CATALOG_MAP}
      >
        <Maps
          apartments={apartments}
          contacts={contacts}
          pages={pages}
          query={filter}
          settings={catalogSettings}
          pageWidgets={pageWidgets}
          profile={profile}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<CatalogMapProps> = async ({ query, req }) => {
  const filter = normalizeApartmentsFilter(query)
  const sort = normalizeApartmentsSort(query)
  const { cookies } = req
  let profile: ProfileEntity | undefined

  if ('token' in cookies) {
    try {
      profile = await getProfile(cookies.token)
    } catch (err) {
      // todo: error handling when the design is ready
    }
  }

  const userHasActiveDeals = Boolean(profile?.countActiveDeals)
  const promo = userHasActiveDeals ? Promo.ExMax : Promo.Default

  const [apartments, contacts, menu, page, pages, catalogSettings, widgets] =
    await getCatalogBatch(filter, sort, promo)

  return {
    props: removeUndefined({
      page,
      pages,
      contacts,
      apartments,
      catalogSettings,
      widgets,
      menu,
      filter,
      profile,
    }),
  }
}

export default CatalogMap
