export default defineNuxtRouteMiddleware((to) => {
  const routeTo = to.name
  if (!routeTo)
    return

  // const locales = useNuxtApp().$i18n.locales.value
  // console.log(useNuxtApp())
  const supabaseUser = useSupabaseUser()

  // Do not redirect on login route, callback route and excluded routes
  const login = 'login'
  const signup = 'signup'
  const callback = 'confirm'

  // remove locale
  const baseRoute = (routeTo as string).split('___')[0]

  // if trying to navigate to login or signup, but user already exists, redirect to home
  if (supabaseUser.value) {
    if ([login, signup].includes(baseRoute))
      return navigateTo(useNuxtApp().$localePath('/'))
  }

  if ([login, signup].includes(baseRoute) && Boolean(supabaseUser.value))
    return navigateTo(useNuxtApp().$localePath('/'))

  if ([
    login,
    signup,
    callback,
  ].includes(baseRoute))
    return

  // if (isExcluded)
  //   return

  const user = useSupabaseUser()
  if (!user.value)
    return navigateTo(useNuxtApp().$localePath('/login'))
})
