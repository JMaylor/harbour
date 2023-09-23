// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: { host: 'localhost' },
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  typescript: { typeCheck: true },
  css: ['~/assets/main.css'],
  modules: [
    '@vueuse/nuxt', // https://vueuse.org/nuxt/README.html
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    'nuxt-icon', // https://github.com/nuxt-modules/icon
    '@nuxtjs/eslint-module', // https://nuxt.com/modules/eslint
    '@nuxtjs/i18n', // https://v8.i18n.nuxtjs.org/
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'fr',
        name: 'Française',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
})
