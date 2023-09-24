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
  <PrimaryHeading class="text-center">
    {{ $t('auth.sign_up') }}
  </PrimaryHeading>
  <form
    class="flex flex-col gap-4 p-4"
    @submit.prevent="onSignUp"
  >
    <BaseInput
      id="email"
      v-model="signUpState.email"
      required
      type="email"
      :label="$t('auth.email')"
      autocomplete="email"
    />
    <BaseInput
      id="password"
      v-model="signUpState.password"
      required
      type="password"
      :label="$t('auth.password')"
      autocomplete="new-password"
    />
    <BaseButton type="submit">
      {{ $t('auth.sign_up') }}
    </BaseButton>
    <NuxtLink
      class="mx-auto text-sm underline"
      :to="useNuxtApp().$localePath('/login')"
    >
      {{ $t('auth.already_got_account') }}
    </NuxtLink>
  </form>
</template>
