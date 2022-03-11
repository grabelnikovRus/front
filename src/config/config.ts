import getConfig from 'next/config'

import { Source } from '@/api'
import { removeTrailingSlash } from '@/lib/string'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const isSSR = typeof window === 'undefined'
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const domain = publicRuntimeConfig.brand === 'pik-broker' ? Source.PikBrokerRu : Source.KvartaRu

export const config = {
  isSSR,
  isDev,
  isProd,
  apiUrl: isSSR ? removeTrailingSlash(serverRuntimeConfig.apiUrl ?? '') ?? '' : '',
  apiBasePath: '/api-react',
  siteOrigin: removeTrailingSlash(`https://${domain}` ?? 'https://pik-broker.ru/404'),
  imgProxyUrl: removeTrailingSlash(publicRuntimeConfig.imgProxyUrl ?? ''),
  domain,
  cacheControlKey: 'Cache-Control',
  cacheControlValue: 'public, s-maxage=10, stale-while-revalidate=59',
  userpanelUrl: removeTrailingSlash(publicRuntimeConfig.userpanelUrl),
  uiscomKey: publicRuntimeConfig.uiscomKey as string | undefined,
  googleCaptchaKey: process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY,
  gtmId: publicRuntimeConfig.gtmId as string | undefined,
  segmentStreamApiKey: process.env.NEXT_PUBLIC_SEGMENTSTREAM_APIKEY,
  ymapsApiKey: process.env.NEXT_PUBLIC_YMAPS_APIKEY,
  devRecaptchaToken: 'local captcha token',
}
