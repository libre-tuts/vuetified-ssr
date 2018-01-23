require('dotenv').config()
const nodeExternals = require('webpack-node-externals')

const polyfills = [
  'Promise',
  'Object.assign',
  'Object.values',
  'Array.prototype.find',
  'Array.prototype.findIndex',
  'Array.prototype.includes',
  'String.prototype.includes',
  'String.prototype.startsWith',
  'String.prototype.endsWith'
]

module.exports = {
  // mode: 'spa', //! UNCOMMENT FOR SPA MODE ONLY
  srcDir: __dirname,
  env: {
    apiUrl: process.env.APP_URL || 'http://api.laravel-nuxt.test',
    appName: process.env.APP_NAME || 'Laravel-Nuxt',
    appLocale: process.env.APP_LOCALE || 'en',
    githubAuth: !!process.env.GITHUB_CLIENT_ID
  },

  head: {
    title: process.env.APP_NAME,
    titleTemplate: '%s - ' + process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vuetified Nuxt' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' }
    ],
    script: [
      { src: `https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfills.join(',')}` }
    ]
  },

  loading: { color: process.env.LOADING_COLOR || '#B9F6CA' },

  router: {
    middleware: ['locale', 'check-auth']
  },

  css: [
    { src: '~assets/style/app.styl', lang: 'stylus' },
    { src: '~assets/sass/app.scss', lang: 'scss' }
  ],

  plugins: [
    // '~components/global',
    '~/plugins/i18n',
    '~/plugins/axios',
    '~/plugins/fontawesome',
    '~/plugins/vform',
    '~/plugins/vuetify'
    // '~plugins/nuxt-client-init', //! UNCOMMENT FOR SPA MODE ONLY
  ],

  modules: [
    '@nuxtjs/router',
    '~/modules/spa',
    [
      'nuxt-env', {
        keys: [
          'API_URL', 'APP_NAME', 'APP_URL', 'APP_LOCALE', 'APP_TRADEMARK',
          'SITE_ADDRESS', 'SITE_CITY', 'SITE_STATE', 'SITE_CONTACT_NO', 'SITE_COUNTRY', 'SITE_EMAIL'
        ]
      }
    ]
  ],

  build: {
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    //! This Will Export The Script in A Vendor.js */
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isServer) {
        //! Externalize app dependencies. This makes the server build much faster
        //! and generates a smaller bundle file. -> /\.css$/
        config.externals = [
          nodeExternals({
            //! this will be included in the bundle
            //! needed since we use ala carte in vuetify
            whitelist: [/^vuetify/]
          })
        ]
      }
      //! add All Your webpack Aliases here
      config.resolve.alias['@fortawesome/fontawesome-free-solid$'] = '@fortawesome/fontawesome-free-solid/shakable.es.js'
    },
    filenames: {
      css: 'common.[contenthash].css',
      manifest: 'manifest.[hash].js',
      vendor: 'common.[chunkhash].js',
      app: 'app.[chunkhash].js',
      chunk: '[name].[chunkhash].js'
    }
  }
}
