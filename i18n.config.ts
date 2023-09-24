export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en: {
      auth: {
        sign_up: 'Sign up',
        sign_out: 'Sign out',
        log_in: 'Log in',
      },
      welcome: 'Welcome',
    },
    fr: {
      auth: {
        sign_up: 'S\'inscrire',
        sign_out: 'Se déconnecter',
        log_in: 'Se connecter',
      },
      welcome: 'Bienvenue',
    },
  },
}))
