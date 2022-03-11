import { GetServerSideProps } from 'next'
import { VFC } from 'react'

import { Promo } from '@/api'
import { Layout } from '@/components'
import { SLUG, config } from '@/config'
import { removeUndefined } from '@/lib/object'
import {
  ApartmentsEntity,
  ApartmentsSort,
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
import { Catalog } from '@components/catalog/catalog'
import { Meta } from '@components/meta/meta'

interface CatalogPageProps {
  page: PageEntity
  pages: PagesEntity
  contacts: ContactsEntity
  apartments: ApartmentsEntity
  catalogSettings: CatalogSettingsEntity
  widgets: WidgetsEntity
  menu: MenuEntity
  pageAlias: string
  sort: ApartmentsSort
  profile?: ProfileEntity
}

const CatalogPage: VFC<CatalogPageProps> = ({
  page,
  pages,
  contacts,
  apartments,
  widgets,
  menu,
  catalogSettings,
  sort,
  profile,
}) => {
  const { pageInfo, widgets: pageWidgets } = page

  return (
    <>
      <Meta
        title={pageInfo.metaTitle}
        origin={`${config.siteOrigin}/${pageInfo.alias}`}
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
        pageSlug={SLUG.CATALOG}
      >
        <Catalog
          apartments={apartments}
          contacts={contacts}
          pages={pages}
          sort={sort}
          settings={catalogSettings}
          pageWidgets={pageWidgets}
          profile={profile}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<CatalogPageProps> = async ({
  query,
  req,
}) => {
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
      pageAlias: 'catalog',
      page,
      pages,
      contacts,
      apartments,
      catalogSettings,
      widgets,
      menu,
      sort,
      profile,
    }),
  }
}

export default CatalogPage
