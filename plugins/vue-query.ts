import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxt) => {
  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })

  nuxt.vueApp.use(VueQueryPlugin, { queryClient })
})
