import { GetServerSideProps } from 'next'
import { VFC } from 'react'

import { Promo } from '@/api'
import { Layout, Meta, ApartmentCard } from '@/components'
import { config, SLUG, PAGE } from '@/config'
import { removeUndefined } from '@/lib/object'
import { ApartmentEntity, getApartment, SimilarApartmentsEntity } from '@/modules/apartment'
import { ApartmentMetaEntity } from '@/modules/apartment-meta'
import { getApartmentBatch } from '@/modules/batch/apartment-batch.entity'
import { ContactsEntity } from '@/modules/contacts'
import { MenuEntity } from '@/modules/menu'
import { getPage, PagesEntity } from '@/modules/pages'
import { getProfile, ProfileEntity } from '@/modules/userpanel'
import { WidgetsEntity } from '@/modules/widgets'

interface ApartmentPageProps {
  pageAlias: string
  contacts: ContactsEntity
  menu: MenuEntity
  pages: PagesEntity
  widgets: WidgetsEntity
  apartment: ApartmentEntity
  apartmentMeta: ApartmentMetaEntity
  apartmentsSimilar: SimilarApartmentsEntity
  pageWidgets: WidgetsEntity
  profile?: ProfileEntity
}

const ApartmentIdPage: VFC<ApartmentPageProps> = ({
  pageAlias,
  contacts,
  menu,
  pages,
  widgets,
  apartment,
  apartmentMeta,
  apartmentsSimilar,
  pageWidgets,
  profile,
}) => {
  const pageSlug = PAGE.SLUG_APARTMENT
  const userHasActiveDeals = Boolean(profile?.countActiveDeals)
  const bannerApartmentWidget = userHasActiveDeals
    ? undefined
    : pageWidgets.find((widget) => widget.name === 'banner_apartment_v5__apartment')
  const bannerModalWidget = pageWidgets.find((widget) => widget.name === 'banner_modal_v5__modal')
  const bannerApartmentSnippetWidget = userHasActiveDeals
    ? undefined
    : pageWidgets.find((widget) => widget.name === 'banner_apartment_snippet_v5__snippet')
  const legalPurityWidget = pageWidgets.find(
    (widget) => widget.name === 'legal_purity_v5__apartment',
  )
  const calculator = pageWidgets.find((widget) => widget.name === 'calculator_v5__apartment')

  return (
    <>
      <Meta
        title={apartmentMeta.metaTitle}
        origin={`${config.siteOrigin}/${pageAlias}/${apartment.amoId}`}
        description={apartmentMeta.metaDescription}
        openGraph={{
          title: apartmentMeta.ogTitle,
          description: apartmentMeta.ogDescription,
        }}
      />
      <Layout
        contacts={contacts}
        menus={menu}
        pages={pages}
        widgets={widgets}
        pageSlug={pageSlug}
      >
        <ApartmentCard
          contacts={contacts}
          apartment={apartment}
          calculator={calculator}
          legalPurity={legalPurityWidget}
          banner={bannerApartmentWidget}
          bannerModal={bannerModalWidget}
          bannerApartmentSnippet={bannerApartmentSnippetWidget}
          apartmentsSimilar={apartmentsSimilar}
          userHasActiveDeals={userHasActiveDeals}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ApartmentPageProps> = async (ctx) => {
  const apartmentId = Number(ctx.params?.id)
  const { cookies } = ctx.req
  let apartment: ApartmentEntity | undefined
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

  try {
    apartment = await getApartment(apartmentId, promo)
  } catch {
    return {
      notFound: true,
    }
  }

  const [contacts, menu, pages, widgets, apartmentMeta, apartmentsSimilar] =
    await getApartmentBatch(apartmentId, promo)

  const { widgets: widgetsArray } = await getPage(SLUG.APARTMENT)

  return {
    props: removeUndefined({
      pageAlias: 'apartment',
      contacts,
      menu,
      pages,
      widgets,
      apartment,
      apartmentMeta,
      pageWidgets: widgetsArray,
      apartmentsSimilar: apartmentsSimilar ?? [],
      profile,
    }),
  }
}

export default ApartmentIdPage
