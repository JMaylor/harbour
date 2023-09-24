<script setup lang="ts">
// disable this route from localization https://v8.i18n.nuxtjs.org/guide/ignoring-localized-routes
defineI18nRoute(false)

const user = useSupabaseUser()
watch(user, () => {
  if (user.value)
    return navigateTo(useNuxtApp().$localePath('/'))
}, { immediate: true })
</script>

<template>
  <div>
    <p class="text-red-500">
      Redirecting...
    </p>
  </div>
</template>
