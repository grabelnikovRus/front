import { ReactNode, useState, VFC } from 'react'

import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'
import { MenuMobile } from '@/components/menu-mobile/menu-mobile'
import { SLUG } from '@/config'
import { ContactsEntity } from '@/modules/contacts'
import { MenuEntity } from '@/modules/menu'
import { PagesEntity } from '@/modules/pages'
import { WidgetsEntity } from '@/modules/widgets'
import { CookiesPopup } from '@/widgets/cookies/cookies'

import { LayoutSellRequestTrigger } from './layout-sell-request-trigger'

export interface LayoutProps {
  children: ReactNode
  contacts: ContactsEntity
  footerEnabled?: boolean
  legalWidgetPresent?: boolean
  menus: MenuEntity
  menuEnabled?: boolean
  pageSlug: string
  pages: PagesEntity
  widgets: WidgetsEntity
}

export const Layout: VFC<LayoutProps> = ({
  children,
  contacts,
  menus,
  pageSlug,
  pages,
  widgets,
  legalWidgetPresent,
}) => {
  const [showingSellRequest, setShowingSellRequest] = useState(false)
  const footerWidget = widgets.find(({ name }) => name === 'footer_v5__global')
  const cookiesWidget = widgets.find(({ name }) => name === 'cookies_v5__global')
  const interactive = widgets.find(({ name }) => name === 'interactive_v5__global')

  return (
    <>
      <Header
        contacts={contacts}
        menu={menus.menu_desktop}
        widget={widgets.find(({ name }) => name === 'city_map_v5__global')}
        pages={pages}
        pageSlug={pageSlug}
      />
      <main className={pageSlug}>{children}</main>
      {footerWidget && pageSlug !== SLUG.CATALOG_MAP && (
        <Footer
          menuSocial={menus.social}
          widget={footerWidget}
          widgetComplain={widgets.find(({ name }) => name === 'complaint_v5__global')}
          pages={pages}
          contacts={contacts}
        />
      )}
      <MenuMobile menu={menus.menu_mobile} contacts={contacts} />
      <LayoutSellRequestTrigger
        fields={interactive?.fields || {}}
        pages={pages}
        pageSlug={pageSlug}
        legalWidgetPresent={legalWidgetPresent}
        isOpen={showingSellRequest}
        onClose={() => setShowingSellRequest(false)}
      />
      {cookiesWidget && <CookiesPopup fields={cookiesWidget?.fields} pages={pages} />}
    </>
  )
}
