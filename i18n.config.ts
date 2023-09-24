export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en: {
      auth: {
        sign_up: 'Sign up',
        sign_out: 'Sign out',
        log_in: 'Log in',
        email: 'Email',
        password: 'Password',
        already_got_account: 'Already got an account? Log in here.',
        no_account: 'No account yet? Sign up here.',
      },
      welcome: 'Welcome',
    },
    fr: {
      auth: {
        sign_up: 'S\'inscrire',
        sign_out: 'Se déconnecter',
        log_in: 'Se connecter',
        email: 'Email',
        password: 'Mot de passe',
        already_got_account: 'Vous avez déjà un compte? Connectez-vous ici.',
        no_account: 'Pas encore de compte? Inscrivez-vous ici.',
      },
      welcome: 'Bienvenue',
    },
  },
}))
