import { useRouter } from 'next/router'
import { useEffect, useRef, useState, VFC } from 'react'

import { Promo, Widget } from '@/api'
import { CatalogFilter } from '@/components/catalog-filter/catalog-filter'
import { CatalogHeader } from '@/components/catalog-header/catalog-header'
import { FORM } from '@/config'
import catalogStyle from '@/legacy/styles/catalog.module.scss'
import { pluralizeCardinal } from '@/lib/i18n'
import {
  ApartmentsEntity,
  ApartmentsSort,
  getApartments,
  normalizeApartmentsFilter,
  normalizeApartmentsSort,
} from '@/modules/apartments-v1'
import { ContactsEntity } from '@/modules/contacts'
import { PagesEntity } from '@/modules/pages'
import { CatalogSettingsEntity } from '@/modules/settings-v1'
import { ProfileEntity } from '@/modules/userpanel'
import { Button, Container } from '@/uikit'

import styles from './catalog.module.scss'
import { CatalogBox } from './components/catalog-box'
import { CatalogList } from './components/catalog-list'
import { CatalogTabs } from './components/catalog-tabs'

import { useMenuMobile } from '../menu-mobile/use-menu-mobile.hook'

const {
  APARTMENT_FILTER: { APARTMENT_PLURAL },
} = FORM

interface CatalogProps {
  apartments: ApartmentsEntity
  contacts: ContactsEntity
  pages: PagesEntity
  sort: ApartmentsSort
  settings: CatalogSettingsEntity
  pageWidgets: Widget[]
  profile?: ProfileEntity
}

export const Catalog: VFC<CatalogProps> = (props) => {
  const [active, setActive] = useState<string | null>(null)
  const [activeTab, setTab] = useState<number>(0)
  const [formCloseTrigger, setFormCloseTrigger] = useState(false)
  const [apartments, setApartments] = useState(props.apartments)
  const catalogTabsRef = useRef<HTMLDivElement>(null)

  const userHasActiveDeals = Boolean(props.profile?.countActiveDeals)

  const banner = userHasActiveDeals
    ? undefined
    : props.pageWidgets.find((widget) => widget.name === 'banner_catalog_v5__catalog')
  const bannerApartmentSnippet = userHasActiveDeals
    ? undefined
    : props.pageWidgets.find((widget) => widget.name === 'banner_apartment_snippet_v5__snippet')
  const bannerModal = userHasActiveDeals
    ? undefined
    : props.pageWidgets.find((widget) => widget.name === 'banner_modal_v5__modal')

  const router = useRouter()
  const menuMobileState = useMenuMobile()

  const closeActive = () => {
    if (active) setActive(null)
    menuMobileState.closeFilterCatalog()
    setFormCloseTrigger(true)
  }

  useEffect(() => {
    if (menuMobileState.isOpenFilterCatalog) {
      setActive('menu_1')
    }

    if (menuMobileState.isOpenFilterMap) {
      menuMobileState.closeFilterMap()
    }
  }, [menuMobileState, menuMobileState.isOpenFilterCatalog])

  useEffect(() => {
    menuMobileState.closeFilterCatalog()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ;(async () => {
      const result = await getApartments(
        normalizeApartmentsFilter(router.query),
        userHasActiveDeals ? Promo.ExMax : Promo.Default,
        normalizeApartmentsSort(router.query),
      )

      setApartments(result)
    })()
  }, [router.query, userHasActiveDeals])

  return (
    <>
      <CatalogHeader count={apartments.count ?? 0} />
      <Container>
        <Button className={styles.catalog_map} href="/catalog-map">
          <picture>
            <source srcSet="/images/catalog/map_x2.jpg" media="(max-width: 767px)" />
            <img alt="map" draggable="false" src="/images/catalog/map.jpg" />
          </picture>
          <div className={styles.catalog_map_count}>
            {pluralizeCardinal(apartments.count ?? 0, APARTMENT_PLURAL)}
          </div>
        </Button>
      </Container>
      <div className={catalogStyle.catalogList}>
        <CatalogBox active={active === 'menu_1'} media="all" onClose={closeActive}>
          <CatalogTabs tabsRef={catalogTabsRef} activeTab={activeTab} setActiveTab={setTab}>
            <CatalogFilter
              contacts={props.contacts}
              settings={props.settings}
              formCloseTrigger={formCloseTrigger}
              closeFilter={closeActive}
              pathname="/catalog"
              userHasActiveDeals={userHasActiveDeals}
              wrapperRef={catalogTabsRef}
            />
            <div />
          </CatalogTabs>
        </CatalogBox>
        <CatalogList
          initialApartments={apartments}
          contacts={props.contacts}
          sort={props.sort}
          banner={banner?.fields}
          bannerApartmentSnippet={bannerApartmentSnippet?.fields}
          bannerModal={bannerModal?.fields}
          userHasActiveDeals={userHasActiveDeals}
        />
      </div>
    </>
  )
}
