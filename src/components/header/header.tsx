/* eslint-disable no-use-before-define */

import cn from 'classnames'
import { useRouter } from 'next/router'
import { VFC, useState, useEffect } from 'react'
import { useToggle } from 'react-use'

import { MenuItem } from '@/api'
import { SLUG } from '@/config'
import { getInitialPhone } from '@/lib/phone'
import { trackEvent } from '@/lib/tracking'
import { ContactsEntity } from '@/modules/contacts'
import { MenuItemEntity } from '@/modules/menu'
import { PagesEntity } from '@/modules/pages'
import { WidgetsEntity } from '@/modules/widgets'
import {
  SvgChangeCity,
  SvgCallMobile,
  FormattingNumbers,
  Menu,
  SvgClose,
  Container,
  Logo,
} from '@/uikit'

import { Location } from './components/location'
import { Login } from './components/login'
import styles from './header.module.scss'

export interface HeaderProps {
  contacts: ContactsEntity
  menu: MenuItemEntity
  widget?: WidgetsEntity[number]
  pageSlug: string
  pages: PagesEntity
}

export const Header: VFC<HeaderProps> = ({ contacts, menu, widget, pages, pageSlug }) => {
  const [isLocationOpen, toggleLocationOpen] = useToggle(false)
  const phone = getInitialPhone(contacts)?.number
  const [location, toggleLocation] = useState(false)

  const { asPath } = useRouter()
  const isVisible = menu.some((el) => asPath.split('?')[0] === el.href)

  const onClickContactPhoneNumber = () => {
    trackEvent({
      category: 'Phone',
      label: 'Phone in the Header',
      name: 'Clicked on the Phone in the Header',
    })
  }

  const onClickMap = () => {
    toggleLocationOpen()
    trackEvent({
      category: 'MAP',
      label: 'Icon Map',
      name: 'Clicked icon Map',
    })
  }

  const closeLocation = () => {
    toggleLocation(false)
    bodyEnabledScroll()
  }

  const openLocation = () => {
    toggleLocation(!location)
    if (!location && window.innerWidth < 992) {
      siteMenudisabled()
      bodyDisabledScroll()
    } else {
      siteMenuEnabled()
      bodyEnabledScroll()
    }
  }

  const bodyDisabledScroll = () => {
    document.body.classList.add('scroll-disabled')
    window.scrollTo(0, window.pageYOffset)
  }
  const bodyEnabledScroll = () => {
    window.scrollTo(0, window.pageYOffset)
    document.body.classList.remove('scroll-disabled')
  }

  const siteMenudisabled = () => {
    document.body.classList.add('hidden-all-menu')
  }
  const siteMenuEnabled = () => {
    document.body.classList.remove('hidden-all-menu')
  }

  useEffect(() => {
    isLocationOpen
      ? document.body.classList.add('no_scroll')
      : document.body.classList.remove('no_scroll')
  }, [isLocationOpen])

  const headerClasses = cn(styles.header, {
    [styles.header___isLocationOpen]: isLocationOpen,
    [styles.header___map]: pageSlug === SLUG.CATALOG_MAP,
    [styles.header___catalog]: pageSlug === SLUG.CATALOG,
  })

  const onClickMenuItem = (menuItem: MenuItem) => {
    let page
    switch (menuItem.slug) {
      case 'menu_desktop__main':
        page = 'Sale'
        break
      case 'menu_desktop__buy':
        page = 'Buy'
        break
      case 'menu_desktop__exchange':
        page = 'Exchange'
        break
      case 'menu_desktop__trade-in':
        page = 'Trade-in'
        break
      default:
        page = 'Sale'
    }

    trackEvent({
      category: 'Menu',
      label: `Menu to ${page}`,
      name: `Clicked Menu to ${page}`,
    })
  }

  return (
    <>
      {widget && (
        <Location
          contacts={contacts}
          fields={widget.fields}
          open={isLocationOpen}
          openLocation={toggleLocationOpen}
        />
      )}
      <header id="header" className={headerClasses}>
        <Container>
          <div className={styles.nav}>
            <Logo />
            <div className="hidden_on_mobile">
              <Menu menu={menu} onClick={onClickMenuItem} />
            </div>
            <div className={styles.nav_any}>
              <a
                href={`tel:${phone}`}
                onClick={onClickContactPhoneNumber}
                data-testid="header__phone"
              >
                <span className={cn(styles.any_icon, styles.any___call)}>
                  <SvgCallMobile />
                </span>
                <span className={styles.any_tel}>
                  <FormattingNumbers value={phone} mode="phone" />
                </span>
              </a>
              <button
                className={styles.any_icon}
                onClick={onClickMap}
                data-testid="header__location"
              >
                {isLocationOpen ? <SvgClose /> : <SvgChangeCity />}
              </button>
              <Login
                className={styles.any_icon}
                closeLocation={closeLocation}
                legalWidgetPresent={false}
                open={location}
                openLocation={openLocation}
                pageSlug={pageSlug}
                pages={pages}
              />
            </div>
          </div>
          {isVisible && (
            <div className="hidden_on_desktop">
              <Menu menu={menu} onClick={onClickMenuItem} />
            </div>
          )}
        </Container>
      </header>
    </>
  )
}
