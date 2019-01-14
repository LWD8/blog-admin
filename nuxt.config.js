const pkg = require('./package')

module.exports = {
  mode: 'universal',
  /**
   * 端口
   */
  server: {
    port: 8803, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'highlight.js/styles/github.css',
    { src: '~assets/common.less', lang: 'less' }
  ],

  /**
   * router
   */
  router: {
    middleware: ['layout']
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~api/axios', ssr: true},
    {src: '~plugins/iview', ssr: true},
    {src: '~plugins/mavon-editor', ssr: false},
    {src: '~plugins/particles', ssr: false},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    ['@nuxtjs/axios', {
      baseURL: process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:3005' : 'http://127.0.0.1:3005',
      requestInterceptor(config, { store }) {
        // config.headers.common['Authorization'] = '1231561651651265165'
        return config
      }
    }],
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    vendor:['axios', 'iview'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
