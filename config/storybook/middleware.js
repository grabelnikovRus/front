const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function expressMiddleware(router) {
  router.use(
    '/ymaps-suggest',
    createProxyMiddleware({
      target: 'https://suggest-maps.yandex.ru',
      changeOrigin: true,
      pathRewrite: { '^/ymaps-suggest': '' },
    }),
  )
  router.use(
    '/api-react',
    createProxyMiddleware({
      target: 'http://localhost:8030',
      changeOrigin: true,
    }),
  )
}
