import Cookies from 'js-cookie'
import { AppProps } from 'next/app'
import { useEffect, VFC } from 'react'
import '@/legacy/styles/global.scss'
import '@/styles/fonts.css'
import '@/styles/globals.scss'
import '@/styles/fs-light-box-styles.scss'
import '@/styles/map.scss'
import 'swiper/swiper.scss'
import 'swiper/components/lazy/lazy.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { polyfill as smoothScrollPolyfill } from 'smoothscroll-polyfill'

import { config } from '@/config'
import { reInitUISCOMCalltracking } from '@/config/uiscom-init'
import { NotifyContainer } from '@/lib/notify/notify-container'
import { trackEvent, updatePage, updateUser } from '@/lib/tracking'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: VFC<AppProps> = ({ Component, pageProps }) => {
  console.info('App render with next data:')
  console.table({
    API: config.apiUrl,
    USERPANEL: config.userpanelUrl,
    DOMAIN: config.domain,
  })

  useEffect(() => {
    updatePage({
      path: location.pathname,
      title: document.title,
      url: location.href,
    })
    updateUser(Cookies.get('userId'))
    trackEvent({ name: 'Viewed Page' })
    if (config.uiscomKey) {
      reInitUISCOMCalltracking(config.uiscomKey)
    }
  })

  useEffect(() => {
    smoothScrollPolyfill()
  }, [])

  return (
    <GoogleReCaptchaProvider useEnterprise language="ru" reCaptchaKey={config.googleCaptchaKey}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <NotifyContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleReCaptchaProvider>
  )
}

export default App
