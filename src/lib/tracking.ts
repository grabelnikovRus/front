type TrackingEvent = {
  name: string
  category?: string
  label?: string
  uuid?: string
}

export const trackCustomEvent = (eventKind: string, trackingEvent?: TrackingEvent): void => {
  window.dataLayer?.push({
    event: eventKind,
    eventCategory: trackingEvent?.category,
    eventAction: trackingEvent?.name,
    eventLabel: trackingEvent?.label,
    eventValue: trackingEvent?.uuid,
  })
}

export const trackEvent = (trackingEvent: TrackingEvent): void => {
  // console.log('Track Event log:', {
  //   category: trackingEvent?.category,
  //   action: trackingEvent?.name,
  //   label: trackingEvent?.label,
  //   value: trackingEvent?.uuid,
  // })
  if (Array.isArray(window.digitalData?.events)) {
    window.digitalData?.events.push(trackingEvent)
  }
  trackCustomEvent('GAEvent', trackingEvent)
}

export const updateUser = (userId?: string): void => {
  if (Array.isArray(window.digitalData?.changes)) {
    window.digitalData?.changes.push({
      user: {
        userId: userId,
        isLoggedIn: Boolean(userId),
      },
    })
  }
}

type PageEntity = {
  path: string
  title: string
  url: string
}

export const updatePage = (page: PageEntity): void => {
  if (Array.isArray(window.digitalData?.changes)) {
    window.digitalData?.changes.push({ page })
  }
}

const prefixedCategory = (name: string, prefix?: string): string => {
  if (prefix) return `${prefix}${name}`
  return name
}

export const categoryForAnalytic = (pageUrl: string, prefix?: string): string => {
  if (!pageUrl) return 'Page not found'

  if (pageUrl === '/') return prefixedCategory('Sale', prefix)

  const page = pageUrl.split('/')[1]

  if (page === 'catalog-map') return prefixedCategory('Buy Map', prefix)

  if (page === 'catalog') return prefixedCategory('Buy Catalog', prefix)

  if (page === 'apartment') return prefixedCategory('Apartments', prefix)

  return prefixedCategory(page.charAt(0).toUpperCase() + page.slice(1), prefix)
}
