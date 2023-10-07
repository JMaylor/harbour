<script setup lang="ts">
// disable this route from localization https://v8.i18n.nuxtjs.org/guide/ignoring-localized-routes
defineI18nRoute(false)

const user = useSupabaseUser()
watch(user, () => {
  if (user.value) {
    useSuccessToast({
      title: 'Thanks for confirming!',
      description: 'Your email has been verified and you\'re all good to go.',
    })
    navigateTo(useNuxtApp().$localePath('/'))
  }
}, { immediate: true })
</script>

<template>
  <div>
    <p class="text-red-500">
      Redirecting...
    </p>
  </div>
</template>
