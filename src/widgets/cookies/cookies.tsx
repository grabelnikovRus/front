import cn from 'classnames'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useState, useEffect, VFC } from 'react'

import { interpolate } from '@/lib/string'
import { useBrowserDetector } from '@/lib/use-browser-detector'
import { useMediaSmallScreen } from '@/lib/use-media'
import { PagesEntity } from '@/modules/pages'
import { WidgetFields, isTextField } from '@/modules/widgets'
import { Button } from '@/uikit'

import styles from './cookies.module.scss'

export interface CookiesPopupProps {
  fields: WidgetFields
  pages: PagesEntity
}

export const CookiesPopup: VFC<CookiesPopupProps> = ({
  fields: { button_name, text },
  pages,
}) => {
  const COOKIE_EXPIRATION_TIME = 30

  const buttonName = isTextField(button_name) ? button_name.value : undefined
  const textCookies = isTextField(text) ? text.value : ''

  const [cookiesAccepted, setCookiesAccepted] = useState(true)

  const browser = useBrowserDetector()
  const isSmallScreen = useMediaSmallScreen()

  const { pathname } = useRouter()
  const isMenuPage = ['/catalog', '/catalog-map', '/apartment/[id]'].includes(pathname)

  const acceptCookies = () => {
    Cookies.set('cookies-accepted', 'true', {
      expires: COOKIE_EXPIRATION_TIME,
      path: '/',
    })
    setCookiesAccepted(true)
  }

  useEffect(() => setCookiesAccepted(Cookies.get('cookies-accepted') === 'true'), [])

  if (cookiesAccepted) return null

  return (
    <section
      className={cn(styles.cookies, {
        [styles.cookies___menu_page]: isMenuPage && !isSmallScreen,
        [styles.cookies___samsung]: browser?.name === 'samsung',
      })}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: interpolate(
            textCookies,
            pages
              .map((page) => ({
                [page.slug]: page.alias,
              }))
              .reduce((accum, value) => ({ ...accum, ...value })),
          ),
        }}
        className={styles.cookies_text}
      />
      <Button
        label={buttonName}
        mode="secondary"
        externalStyles={styles.cookies_button}
        onClick={acceptCookies}
      />
    </section>
  )
}
