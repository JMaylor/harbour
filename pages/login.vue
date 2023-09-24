<script setup lang='ts'>
definePageMeta({ layout: 'auth' })

const user = useSupabaseUser()
const supabase = useSupabaseClient()

watch(user, () => {
  if (user.value)
    return navigateTo(useNuxtApp().$localePath('/'))
}, { immediate: true })

const logInState = reactive({
  email: '',
  password: '',
})

async function onLogIn() {
  const { error } = await supabase.auth.signInWithPassword(logInState)

  if (error)
    console.error(error)
}
</script>

<template>
  <h1>{{ $t('auth.log_in') }}</h1>
  <form @submit.prevent="onLogIn">
    <input
      v-model="logInState.email"
      required
      type="email"
      class="border"
      placeholder="email"
      autocomplete="email"
    >
    <input
      v-model="logInState.password"
      required
      type="password"
      class="border"
      placeholder="password"
      autocomplete="current-password"
    >
    <button>{{ $t('auth.log_in') }}</button>
  </form>
</template>
