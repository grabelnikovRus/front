import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useCallback, VFC } from 'react'
import { useSwipeable } from 'react-swipeable'

import { getInitialPhone } from '@/lib/phone'
import { trackEvent } from '@/lib/tracking'
import { useBrowserDetector } from '@/lib/use-browser-detector'
import { ContactsEntity } from '@/modules/contacts'
import { MenuItemEntity } from '@/modules/menu'
import {
  SvgHomeMobile,
  SvgServicesMobile,
  SvgInteractiveMobile,
  SvgCallMobile,
  SvgCatalogMobile,
  SvgFilter,
} from '@/uikit'

import styles from './menu-mobile.module.scss'
import { useMenuMobile } from './use-menu-mobile.hook'

import { useLayoutSellRequest } from '../layout/use-layout-sell-request.hook'

export interface MenuMobileProps {
  contacts: ContactsEntity
  menu: MenuItemEntity
}

export const MenuMobile: VFC<MenuMobileProps> = ({ contacts, menu }) => {
  const [openPopup, setOpenPopup] = useState(false)
  const [delta, setDelta] = useState(0)

  const menuMobileState = useMenuMobile()
  const { openSellRequest } = useLayoutSellRequest()

  const handlers = useSwipeable({
    onSwiping: ({ deltaY }) => {
      if (openPopup && deltaY > 0) setDelta(-deltaY)
    },
    onSwipedDown: () => {
      setOpenPopup(false)
      setDelta(0)
    },
    preventDefaultTouchmoveEvent: true,
  })

  const phone = getInitialPhone(contacts)?.number
  const mainPageInfo = menu.find((el) => el.slug === 'menu_mobile__main')
  const buyPageInfo = menu.find((el) => el.slug === 'menu_mobile__buy')
  const salePageInfo = menu.find((el) => el.slug === 'menu_mobile__sale')
  const exchangePageInfo = menu.find((el) => el.slug === 'menu_mobile__exchange')
  const tradeInPageInfo = menu.find((el) => el.slug === 'menu_mobile__trade-in')

  const { asPath, pathname } = useRouter()
  const isCatalog = pathname === '/catalog'
  const isCatalogMap = pathname === '/catalog-map'
  const isApartment = pathname === '/apartment/[id]'

  const browser = useBrowserDetector()

  const onClickBody = useCallback(
    (event: globalThis.MouseEvent) => {
      event.stopPropagation()
      if (openPopup) {
        document.body.classList.remove(styles.overlay___open)
        setOpenPopup(false)
      }
    },
    [openPopup],
  )

  const onClickCall = () => {
    trackEvent({
      category: 'UX',
      name: 'Clicked Tel Link',
      label: 'Telephone Menu Mobile',
    })
    setOpenPopup(false)
  }

  const onClickCatalog = () => {
    trackEvent({
      category: 'UX',
      name: 'Menu Mobile',
      label: 'Click Link Catalog',
    })
    setOpenPopup(false)
  }

  const onClickServices = () => {
    trackEvent({
      category: 'UX',
      name: 'Menu Mobile',
      label: 'Click Link Services',
    })
    setOpenPopup((prev) => !prev)
  }

  const onClickMainFilter = () => {
    trackEvent({
      category: 'UX',
      name: 'Menu Mobile',
      label: 'Click Link Home',
    })
    menuMobileState.openFilterCatalog()
  }

  const onClickMainInteractive = () => {
    trackEvent({
      category: 'UX',
      name: 'Menu Mobile',
      label: 'Click Link Home',
    })
    setOpenPopup(false)
    openSellRequest()
  }

  useEffect(() => {
    document.body.addEventListener('click', onClickBody)
    document.body.classList.add(styles.overlay)
    openPopup
      ? document.body.classList.add(styles.overlay___open)
      : document.body.classList.remove(styles.overlay___open)
    return () => {
      document.body.removeEventListener('click', onClickBody)
      document.body.classList.remove(styles.overlay)
    }
  }, [openPopup, onClickBody])

  if (isApartment) return null

  return (
    <>
      <div
        className={cn(styles.menu, {
          [styles.menu___catalog]: isCatalog,
          [styles.menu___catalog_map]: isCatalogMap,
          [styles.menu___open_filter]:
            menuMobileState.isOpenList || menuMobileState.isOpenFilterMap,
          [styles.menu___iOS]: browser?.os === 'iOS',
          [styles.menu___samsung]: browser?.name === 'samsung',
          [styles.menu___closed]: !menuMobileState.isOpenMenu,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {!isCatalogMap && !isCatalog && (
          <>
            <Link href={mainPageInfo?.href || '/'}>
              <a
                className={cn(styles.menu_item, {
                  [styles.menu_item___active]: asPath === mainPageInfo?.href,
                })}
                onClick={() => setOpenPopup(false)}
              >
                <SvgHomeMobile />
                {mainPageInfo?.title}
              </a>
            </Link>
            <button
              className={cn(styles.menu_item, {
                [styles.menu_item___active]: openPopup,
              })}
              onClick={onClickServices}
            >
              <SvgServicesMobile />
              Услуги
            </button>
            <div className={styles.menu_item}>
              {/** TODO при реализации интерактива, данная кнопка должна его открывать*/
              /** и мобильно меню должно скрываться*/}
              {asPath === '/' ? (
                <button className={styles.menu_interactive} onClick={onClickMainFilter}>
                  <SvgFilter />
                </button>
              ) : (
                <button className={styles.menu_interactive} onClick={onClickMainInteractive}>
                  <SvgInteractiveMobile />
                </button>
              )}
            </div>
            <Link href={salePageInfo?.href || '/sale'}>
              <a
                className={cn(styles.menu_item, {
                  [styles.menu_item___active]: asPath === salePageInfo?.href,
                })}
                onClick={onClickCatalog}
              >
                <SvgCatalogMobile />
                {salePageInfo?.title}
              </a>
            </Link>
            <a className={styles.menu_item} href={`tel:${phone}`} onClick={onClickCall}>
              <SvgCallMobile />
              Звонок
            </a>
          </>
        )}
      </div>
      <ul
        onClick={(e) => e.stopPropagation()}
        className={cn(styles.popup, {
          [styles.popup___open]: openPopup,
          [styles.popup___iphone]: browser?.os === 'iOS',
          [styles.popup___samsung]: browser?.name === 'samsung',
        })}
        {...handlers}
        style={{ bottom: `${delta}px` }}
      >
        {([salePageInfo, buyPageInfo, exchangePageInfo, tradeInPageInfo] as MenuItemEntity).map(
          (info) => {
            if (info === undefined) return null
            return (
              <li key={info.title} className={styles.popup_item}>
                <Link href={info.href}>
                  <a className={styles.popup_link} onClick={() => setOpenPopup(false)}>
                    <h5 className={styles.popup_title}>{info.title}</h5>
                    <h6 className={styles.popup_description}>{info.description}</h6>
                  </a>
                </Link>
              </li>
            )
          },
        )}
      </ul>
    </>
  )
}
