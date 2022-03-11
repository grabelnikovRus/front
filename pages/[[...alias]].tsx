/* eslint-disable max-lines */
import Cookies from 'js-cookie'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState, VFC } from 'react'

import { Meta, Layout } from '@/components'
import { SLUG, config } from '@/config'
import { removeUndefined } from '@/lib/object'
import { trackEvent, categoryForAnalytic } from '@/lib/tracking'
import { useMediaSmallScreen } from '@/lib/use-media'
import { ApartmentsEntity } from '@/modules/apartments-v1'
import { getAliasBatch, getCatalogMainBatch } from '@/modules/batch'
import { ContactsEntity } from '@/modules/contacts'
import { MenuEntity } from '@/modules/menu'
import { getPage, notFoundPage, PageEntity, PagesEntity } from '@/modules/pages'
import { CatalogSettingsEntity } from '@/modules/settings-v1'
import { getProfile, ProfileEntity } from '@/modules/userpanel'
import { WidgetsEntity } from '@/modules/widgets'
import { pageSlug } from '@/types/page-slug'
import { Container } from '@/uikit'
import {
  ConditionsList,
  EntryForm,
  Faq,
  HowItWorks,
  Legal,
  Nameplate,
  ExchangeApartment,
  SearchCatalog,
  ListInfo,
  ExchangeMax,
  Features,
  PagesFeatures,
} from '@/widgets'

interface AliasPageProps {
  alias: string
  pageSlug: pageSlug
  apartments: ApartmentsEntity | null
  contacts: ContactsEntity
  menus: MenuEntity
  page: PageEntity
  pages: PagesEntity
  settingsCatalog: CatalogSettingsEntity | null
  widgets: WidgetsEntity
}

const getPageAlias = (aliases: string | string[] | undefined): string =>
  Array.isArray(aliases) ? aliases[0] : aliases ?? ''

const AliasPage: VFC<AliasPageProps> = ({
  contacts,
  menus,
  widgets,
  pages,
  pageSlug,
  page,
  apartments,
  settingsCatalog,
}) => {
  const [profile, setProfile] = useState<ProfileEntity>()
  const { pageInfo, widgets: pageWidgets } = page
  const legalWidgetPresent = pageWidgets.some(({ name }) => /^contract/.test(name))

  const nameplateExchange = pageWidgets.find((el) => el.name === 'nameplate_v5__exchange_max')
  const nameplateTradeIn = pageWidgets.find((el) => el.name === 'nameplate_v5__trade_in')

  const isSmallScreen = useMediaSmallScreen()

  const { asPath } = useRouter()
  const isExchange = asPath === '/exchange'

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      try {
        getProfile(token).then(setProfile)
      } catch (err) {
        // todo: error handling when the design is ready
      }
    }
  }, [])

  const topPageSection = () => {
    switch (pageSlug) {
      case SLUG.SALE:
        return widgets.map((widget) => {
          switch (widget.name) {
            case 'entry_form_v5__mainpage':
              return (
                <Container key={widget.name}>
                  <EntryForm fields={widget.fields} pageSlug={SLUG.SALE} key={widget.name} />
                </Container>
              )
            default:
              return null
          }
        })
      case SLUG.EXCHANGE:
        return widgets.map((widget) => {
          switch (widget.name) {
            case 'entry_form_v5__exchange':
              return (
                <Fragment key={widget.name}>
                  <Container>
                    <EntryForm fields={widget.fields} pageSlug={pageSlug} />
                  </Container>
                  {nameplateExchange && (
                    <div className="hidden_on_desktop">
                      <Container>
                        <Nameplate fields={nameplateExchange.fields} />
                      </Container>
                    </div>
                  )}
                </Fragment>
              )
            default:
              return null
          }
        })
      case SLUG.TRADE_IN:
        return widgets.map((widget) => {
          switch (widget.name) {
            case 'entry_form_v5__trade_in':
              return (
                <Fragment key={widget.name}>
                  <Container>
                    <EntryForm fields={widget.fields} pageSlug={pageSlug} />
                  </Container>
                  {nameplateTradeIn && (
                    <div className="hidden_on_desktop">
                      <Container>
                        <Nameplate fields={nameplateTradeIn.fields} mode="tradein" />
                      </Container>
                    </div>
                  )}
                </Fragment>
              )
            default:
              return null
          }
        })
      case SLUG.INDEX:
        return widgets.map((widget) => {
          switch (widget.name) {
            case 'search_catalog_form_v5__global':
              return (
                <Container key={widget.name}>
                  <SearchCatalog
                    apartments={apartments}
                    contacts={contacts}
                    settings={settingsCatalog}
                    fields={widget.fields}
                    profile={profile}
                  />
                </Container>
              )
            default:
              return null
          }
        })
    }
  }

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
        menus={menus}
        pageSlug={pageSlug}
        pages={pages}
        widgets={widgets}
      >
        {legalWidgetPresent ? (
          <Container>
            <Legal menus={menus} slug={pageInfo.alias} widgets={pageWidgets} />
          </Container>
        ) : (
          <>
            {topPageSection()}
            {pageWidgets.map((widget) => {
              switch (widget.name) {
                case 'faq_v5__exchange':
                case 'faq_v5__exchange_max':
                case 'faq_v5__buy':
                  return (
                    <Container key={widget.name}>
                      <Faq
                        fields={widget.fields}
                        onAnalyticEvent={() => {
                          trackEvent({
                            category: categoryForAnalytic(location.pathname),
                            label: 'Any of the Questions and Answers',
                            name: 'Click on Any of the Questions and Answers',
                          })
                        }}
                      />
                    </Container>
                  )
                case 'how_it_works_v5__exchange_max':
                case 'how_it_works_v5__buy':
                  return isExchange ? (
                    <Container key={widget.name + 'exchange'}>
                      <HowItWorks fields={widget.fields} />
                    </Container>
                  ) : (
                    <Container key={widget.name}>
                      <HowItWorks fields={widget.fields} />
                    </Container>
                  )
                case 'conditions_list_v5__exchange_max':
                  return (
                    <Container containerType="full" theme="light" border="top" key={widget.name}>
                      {!isSmallScreen && nameplateExchange && (
                        <Container>
                          <Nameplate fields={nameplateExchange.fields} />
                        </Container>
                      )}
                      <Container containerType="full" theme="default" border="top">
                        <Container>
                          <ConditionsList fields={widget.fields} />
                        </Container>
                      </Container>
                    </Container>
                  )
                case 'conditions_list_v5__trade_in':
                  return (
                    <Container containerType="full" theme="light" border="top" key={widget.name}>
                      {!isSmallScreen && nameplateTradeIn && (
                        <Container>
                          <Nameplate fields={nameplateTradeIn.fields} mode="tradein" />
                        </Container>
                      )}
                      <Container containerType="full" theme="default" border="top">
                        <Container>
                          <ConditionsList fields={widget.fields} />
                        </Container>
                      </Container>
                    </Container>
                  )
                case 'exchange_apartment_v5__trade_in':
                  return (
                    <Container key={widget.name}>
                      <ExchangeApartment fields={widget.fields} />
                    </Container>
                  )
                case 'list_info_v5__buy':
                  return (
                    <Container
                      containerType="full"
                      theme="default"
                      border="top"
                      key={widget.name}
                    >
                      <Container>
                        <ListInfo fields={widget.fields} />
                      </Container>
                    </Container>
                  )
                case 'entry_form_exchange_v5__buy':
                  return (
                    <Container key={widget.name}>
                      <EntryForm isExchangeMax fields={widget.fields} pageSlug={pageSlug} />
                    </Container>
                  )
                case 'exchange_max_v5__mainpage':
                  return (
                    <Container key={widget.name}>
                      <ExchangeMax
                        fields={widget.fields}
                        onAnalyticEvent={() => {
                          trackEvent({
                            category: 'Sale',
                            label: 'Select an Apartment',
                            name: 'Click on the button to Select an Apartment',
                          })
                        }}
                      />
                    </Container>
                  )
                case 'features_v5__mainpage':
                  return (
                    <Container key={widget.name}>
                      <Features fields={widget.fields} />
                    </Container>
                  )
                case 'pages_features_v5__mainpage':
                  return (
                    <Container key={widget.name}>
                      <PagesFeatures fields={widget.fields} />
                    </Container>
                  )
                case 'how_it_works_v5__mainpage':
                  return (
                    <Container key={widget.name}>
                      <HowItWorks fields={widget.fields} />
                    </Container>
                  )
                case 'faq_v5__mainpage':
                  return (
                    <Container key={widget.name}>
                      <Faq
                        fields={widget.fields}
                        onAnalyticEvent={() => {
                          trackEvent({
                            category: categoryForAnalytic(location.pathname),
                            label: 'Any of the Questions and Answers',
                            name: 'Click on Any of the Questions and Answers',
                          })
                        }}
                      />
                    </Container>
                  )
                default:
                  return null
              }
            })}
          </>
        )}
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
})

export const getStaticProps: GetStaticProps<AliasPageProps, { alias: string }> = async ({
  params,
}) => {
  const pageAlias = params?.alias ?? '' // empty string for index page
  const [contacts, menus, pages, widgets] = await getAliasBatch()
  const currentPage = pages?.find((page) => page.alias === getPageAlias(pageAlias))
  const pageSlug = currentPage?.slug || SLUG['404']
  const page =
    pageSlug !== SLUG['404'] && currentPage?.active
      ? await getPage(pageSlug)
      : // @todo Return this data from API.
        notFoundPage

  const catalogEntry = await getCatalogMainBatch()

  return {
    props: removeUndefined({
      alias: params?.alias ?? '',
      pageSlug,
      apartments: catalogEntry?.[0] ?? null,
      contacts,
      menus,
      page,
      pages,
      settingsCatalog: catalogEntry?.[1] ?? null,
      widgets,
    }),
    notFound: pageSlug === SLUG['404'],
    revalidate: 10,
  }
}

export default AliasPage
