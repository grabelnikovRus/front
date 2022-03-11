import Head from 'next/head'
import { VFC } from 'react'

interface MetaProps {
  title: string
  description: string
  origin: string
  openGraph?: Record<'title' | 'description', string>
  ignoreQueryParams?: boolean
}

export const Meta: VFC<MetaProps> = ({
  title,
  origin,
  description,
  openGraph = {},
  ignoreQueryParams = false,
}) => (
  <Head>
    <title>{title}</title>
    <link rel="canonical" href={origin} />
    <link href="/images/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
    <link href="/images/favicon/icon-32.png" rel="icon" sizes="32x32" type="image/png" />
    <link href="/images/favicon/icon-16.png" rel="icon" sizes="16x16" type="image/png" />
    <link href="/images/favicon/site.webmanifest" rel="manifest" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <meta name="description" itemProp="description" content={description} />
    <meta content="#ffffff" name="msapplication-TileColor" />
    <meta content="#090A15" name="theme-color" />
    <meta
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
      name="viewport"
    />
    {/* Disable automatic detection of possible phone numbers in a webpage in Safari on iOS. */}
    <meta name="format-detection" content="telephone=no" />
    {Object.entries(openGraph).map(([property, content]) => (
      <meta key={property} property={`og:${property}`} content={content} />
    ))}
    {ignoreQueryParams && <meta name="robots" content="noindex, nofollow" />}
  </Head>
)
