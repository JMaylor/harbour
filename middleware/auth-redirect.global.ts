export default defineNuxtRouteMiddleware((to) => {
  const routeTo = to.name
  if (!routeTo)
    return

  const supabaseUser = useSupabaseUser()

  // Do not redirect on login route, callback route and excluded routes
  const login = 'login'
  const signup = 'signup'

  // remove locale
  const baseRoute = (routeTo as string).split('___')[0]

  // if trying to navigate to login or signup, but user already exists, redirect to home
  if (supabaseUser.value) {
    if ([login, signup].includes(baseRoute))
      return navigateTo(useNuxtApp().$localePath('/'))
  }

  else {
    if (![login, signup].includes(baseRoute))
      return navigateTo(useNuxtApp().$localePath('/login'))
  }
})
