export default {
  target: 'static',
  ssr: true,

  head: {
    title: 'bldr',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@builder.io/sdk-vue/vue2/css',
  ],

  plugins: [
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],

  modules: [
  ],

  build: {
    extend: (config, { isClient }) => {
      const svgRule = config.module.rules.find((rule) =>
        rule.test.test('.svg')
      );

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader'],
      });

      if (isClient) {
        config.devtool = process.env.CI ? 'source-map' : '';
      }
    },
    transpile: ['@builder.io/sdk-vue'],
  },
  generate: {
    interval: 1000,
    fallback: true,
    routes: ['/']
  }
}
