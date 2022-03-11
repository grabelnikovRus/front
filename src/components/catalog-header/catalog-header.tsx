import cn from 'classnames'
import { useRouter } from 'next/router'
import { VFC, useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'

import { FORM } from '@/config'
import { pluralizeCardinal } from '@/lib/i18n'
import { trackEvent } from '@/lib/tracking'
import { defaultSort } from '@/modules/apartments-v1'
import {
  Switcher,
  Container,
  SvgFilter,
  ButtonIcon,
  Dropdown,
  DropdownProps,
  SvgSort,
} from '@/uikit'
import { useMenuMobile } from '@components/menu-mobile/use-menu-mobile.hook'

import styles from './catalog-header.module.scss'

const {
  APARTMENT_FILTER: { APARTMENT_PLURAL },
} = FORM

const SORT_OPTIONS = [
  { id: 'createdAt,desc', name: 'По умолчанию' },
  { id: 'priceRub,desc', name: 'Сначала дороже' },
  { id: 'priceRub,asc', name: 'Сначала дешевле' },
  { id: 'fullArea,desc', name: 'Сначала больше, м²' },
  { id: 'fullArea,asc', name: 'Сначала меньше, м²' },
]

export interface CatalogHeaderProps {
  count?: number
}

export const CatalogHeader: VFC<CatalogHeaderProps> = ({ count }) => {
  const { y } = useWindowScroll()
  const menuMobileState = useMenuMobile()
  const { pathname } = useRouter()
  const isCatalog = pathname === '/catalog'
  const isCatalogMap = pathname === '/catalog-map'
  const [headerHeight, setHeaderHeight] = useState(0)
  const router = useRouter()
  const [windowScrollTop, setWindowScrollTop] = useState(0)

  useEffect(() => {
    const header = document.getElementById('header')

    if (header) {
      const height = header.getBoundingClientRect().height

      setHeaderHeight(height)
      setWindowScrollTop(window.scrollY)
    }
  }, [])

  const onChange = (data: string) => {
    const [sortBy, sortOrder] = data.split(',')
    const query: Record<string, string> = {
      ...router.query,
      sortBy,
      sortOrder,
    }

    if (sortBy === defaultSort.sortBy && sortOrder === defaultSort.sortOrder) {
      delete query.sortBy
      delete query.sortOrder
    }

    let eventType
    switch (data) {
      case 'createdAt,desc':
        eventType = 'Default Filter'
        break
      case 'priceRub,desc':
        eventType = 'Filter First More Expensive'
        break
      case 'priceRub,asc':
        eventType = 'Filter Initially Cheaper'
        break
      case 'fullArea,desc':
        eventType = 'Filter First Large m2'
        break
      case 'fullArea,asc':
        eventType = 'Filter First Less m2'
        break
      default:
        eventType = 'Default Filter'
    }

    trackEvent({
      category: 'Funnel Buy Catalog',
      name: `Selected ${eventType}`,
      label: eventType,
    })

    router.replace({ pathname: location.pathname, query }, undefined, { shallow: true })
  }

  const onClickFilter = () => {
    trackEvent({
      category: `Funnel Buy ${isCatalogMap ? 'Map' : 'Catalog'}`,
      name: 'Clicked on the Filter',
      label: 'Filter',
    })

    if (isCatalogMap) {
      menuMobileState.toggleFilterMap()
      menuMobileState.closeList()
    }

    if (isCatalog) {
      menuMobileState.openFilterCatalog()
    }
  }

  const Icon: DropdownProps['renderButton'] = (props) => (
    <div {...props}>
      <SvgSort />
    </div>
  )

  useEffect(() => {
    setWindowScrollTop(y)
  }, [y])

  const headerClassName = cn(styles.header, {
    [styles.header___scroll]: windowScrollTop > headerHeight && pathname === '/catalog',
    [styles.header___catalog]: pathname === '/catalog',
    [styles.header___catalog_map]: pathname === '/catalog-map',
  })

  return (
    <div className={headerClassName}>
      <Container>
        <div className={styles.header_wrapper}>
          {Number(count) >= 0 && (
            <div className={styles.header_search_result}>{`Найдено ${pluralizeCardinal(
              Number(count),
              APARTMENT_PLURAL,
            )}`}</div>
          )}
          <div className={styles.action_panel}>
            <div className={styles.action_panel_sort}>
              <Dropdown
                items={SORT_OPTIONS}
                renderButton={Icon}
                theme="smallScreenIcon"
                onChange={onChange}
                value={[
                  router.query.sortBy ?? defaultSort.sortBy,
                  router.query.sortOrder ?? defaultSort.sortOrder,
                ].join()}
              />
            </div>
            <div className={styles.action_panel_swither}>
              <Switcher
                theme="coloured"
                size="small"
                buttons={[
                  {
                    mode: 'link',
                    path: '/catalog-map',
                    text: 'Карта',
                    slug: 'map',
                    callback: () => {
                      trackEvent({
                        category: 'Funnel Buy Catalog',
                        name: 'Click on the Map',
                        label: 'Map',
                      })
                    },
                  },
                  {
                    mode: 'link',
                    path: '/catalog',
                    text: 'Список',
                    slug: 'list',
                    callback: () => {
                      trackEvent({
                        category: 'Funnel Buy Map',
                        name: 'Clicked on the List',
                        label: 'List',
                      })
                    },
                  },
                ]}
              />
            </div>
            <ButtonIcon onClick={onClickFilter} className={styles.action_panel_filter}>
              <SvgFilter />
            </ButtonIcon>
          </div>
        </div>
      </Container>
    </div>
  )
}
