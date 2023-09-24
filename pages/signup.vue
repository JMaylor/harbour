<script setup lang='ts'>
definePageMeta({ layout: 'auth' })

const supabase = useSupabaseClient()

const signUpState = reactive({
  email: '',
  password: '',
})

async function onSignUp() {
  const { data, error } = await supabase.auth.signUp(signUpState)

  console.error('error', error)

  if (error)
    alert(error.message)

  else if (data?.user?.identities?.length === 0)
    alert('User already exists!')

  else
    alert('Check your email for the confirmation link')
}

const user = useSupabaseUser()

watch(user, () => {
  if (user.value)
    return navigateTo(useNuxtApp().$localePath('/'))
}, { immediate: true })
</script>

<template>
  <h1>{{ $t('auth.sign_up') }}</h1>
  <form @submit.prevent="onSignUp">
    <input
      v-model="signUpState.email"
      required
      type="email"
      class="border"
      placeholder="email"
      autocomplete="email"
    >
    <input
      v-model="signUpState.password"
      required
      type="password"
      class="border"
      placeholder="password"
      autocomplete="new-password"
    >
    <button>{{ $t('auth.sign_up') }}</button>
  </form>
</template>
