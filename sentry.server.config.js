import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const SENTRY_DSN = publicRuntimeConfig.sentryDSN

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    enabled: process.env.NODE_ENV === 'production',
    environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV,
    tracesSampleRate: 0, // 0, т.к. в нашем sentry нет performance monitoring (старая версия)
  })
}
