import { setConfig } from 'next/config'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import './global.scss'
import '../../src/styles/fs-light-box-styles.scss'
import '../../src/styles/fonts.css'
import 'swiper/swiper.scss'
import 'swiper/components/lazy/lazy.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'

setConfig({
  serverRuntimeConfig: {
    apiUrl: process.env.API_ORIGIN,
  },
  publicRuntimeConfig: {
    brand: process.env.NEXT_PUBLIC_BRAND,
    imgProxyUrl: process.env.NEXT_PUBLIC_IMG_PROXY_URL,
    userpanelUrl: process.env.NEXT_PUBLIC_USERPANEL_ORIGIN,
  },
})

const customViewports = {
  xl3: {
    name: 'xl3-1920',
    styles: {
      width: '1920px',
      height: '963px',
    },
  },
  xl2: {
    name: 'xl2-1440',
    styles: {
      width: '1440px',
      height: '963px',
    },
  },
  xl: {
    name: 'xl-1280',
    styles: {
      width: '1280px',
      height: '963px',
    },
  },
  lg: {
    name: 'lg-1024',
    styles: {
      width: '1024px',
      height: '1366px',
    },
  },
  md: {
    name: 'md-768',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  sm: {
    name: 'sm-414',
    styles: {
      width: '414px',
      height: '736px',
    },
  },
  xs: {
    name: 'xs-375',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  xxs: {
    name: 'xxs-320',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,
  },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
