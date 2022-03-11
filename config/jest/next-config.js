jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    apiUrl: '',
  },
  publicRuntimeConfig: {
    brand: 'pik-broker',
    siteOrigin: '',
    imgProxyUrl: '',
    userpanelUrl: '',
  },
}))
