export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
      login: 'Log in',
      authorization_layout: 'Authorization layout',
      default_layout: 'Default layout',
    },
    fr: {
      welcome: 'Bienvenue',
      login: 'Se connecter',
      default_layout: 'Disposition par défaut',
      authorization_layout: 'Disposition des autorisations',
    },
  },
}))
