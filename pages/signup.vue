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
  <UForm
    :state="signUpState"
    class="space-y-4 p-4"
    @submit="onSignUp"
  >
    <UInput
      v-model="signUpState.email"
      required
      type="email"
      autocomplete="email"
      icon="i-heroicons-at-symbol-20-solid"
      :placeholder="$t('auth.email')"
    />
    <UInput
      v-model="signUpState.password"
      required
      type="password"
      autocomplete="new-password"
      icon="i-heroicons-key-20-solid"
      :placeholder="$t('auth.password')"
    />
    <UButton
      class="mx-auto block"
      type="submit"
    >
      {{ $t('auth.sign_up') }}
    </UButton>
    <div class="mx-auto text-center">
      <ULink
        class="text-sm underline"
        :to="useNuxtApp().$localePath('/login')"
      >
        {{ $t('auth.already_got_account') }}
      </ULink>
    </div>
  </UForm>
</template>
