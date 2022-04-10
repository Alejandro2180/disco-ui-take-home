const webpack = require('webpack');

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-links',
    'storybook-dark-mode',
    {
       name: '@storybook/addon-docs',
       options: { configureJSX: true },
       babelOptions: {},
       sourceLoaderOptions: null,
       transcludeMarkdown: true,
    }
  ],
  core: {
    builder: 'webpack5',
  },
  features: {
    emotionAlias: false,
  },
  webpackFinal: (config) => {
    return {
      ...config,
      plugins: [
        ...config.plugins,

        // Workaround for Buffer is undefined error:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
        new webpack.ProvidePlugin({ process: 'process/browser' }),
      ],
      resolve: {
        ...config.resolve,

        // Workarounds for Webpack 5 not shimming/polyfilling these node core modules
        // @NOTE: Potentially this means some libraries that depend on these node modules may break in storybook as result of returning `false` here? If so we can use polyfills e.g. `yarn add crypto-browserify` and return `require.resolve('crypto-browserify')` below instead of `false`, etc
        fallback: {
          crypto: false,
          stream: false,
          os: false,
          http: false,
          https: false,
        },
      },
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                }
              },
            ],
            type: 'javascript/auto'
          },
        ],
      },
    };
  },
};
