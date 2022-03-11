const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

module.exports = {
  framework: '@storybook/react',
  features: {
    storyStoreV7: true,
  },
  core: {
    builder: 'webpack5',
  },
  stories: ['../../src'],
  staticDirs: ['../../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
          postcssOptions: {
            syntax: 'postcss-scss',
          },
        },
      },
    },
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true,
            localIdentName: '[local]--[hash:base64:5]',
          },
        },
      },
    },
  ],
  webpackFinal: (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ]

    const cssRule = config.module.rules.find((rule) => rule?.test.test('.css'))
    const sassRule = config.module.rules.find((rule) => rule?.test.test('.scss'))
    const postCSSLoader = cssRule.use.find((config) => config?.loader.includes('postcss-loader'))
    sassRule.use.push(postCSSLoader)

    return config
  },
}
