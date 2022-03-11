const bundleAnalyzer = require('@next/bundle-analyzer')
const { withSentryConfig } = require('@sentry/nextjs')
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([withImages, withSentryConfig, withBundleAnalyzer], {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
    apiUrl: process.env.API_ORIGIN,
  },
  publicRuntimeConfig: {
    brand: process.env.NEXT_PUBLIC_BRAND,
    imgProxyUrl: process.env.NEXT_PUBLIC_IMG_PROXY_URL,
    userpanelUrl: process.env.NEXT_PUBLIC_USERPANEL_ORIGIN,
    sentryDSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    uiscomKey: process.env.NEXT_PUBLIC_UISCOM,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  },
  productionBrowserSourceMaps: true,
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  images: {
    disableStaticImages: true,
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },
  [PHASE_DEVELOPMENT_SERVER]: {
    async rewrites() {
      return [
        {
          source: '/:url(api-react|widgets|upload)/:path*',
          destination: `${process.env.API_PROXY_ORIGIN}/:url/:path*`,
        },
        {
          source: '/ymaps-suggest/:path*',
          destination: 'https://suggest-maps.yandex.ru/:path*',
        },
        {
          source: '/robots.txt',
          destination: '/api/robots',
        },
      ]
    },
  },
})
