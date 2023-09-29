<script setup lang='ts'>
definePageMeta({ layout: 'auth' })

const logInState = reactive({
  email: '',
  password: '',
})

const supabase = useSupabaseClient()
async function onLogIn() {
  const { error } = await supabase.auth.signInWithPassword(logInState)

  if (error)
    console.error(error)

  else navigateTo(useNuxtApp().$localePath('/'))
}
</script>

<template>
  <PrimaryHeading class="text-center">
    {{ $t('auth.log_in') }}
  </PrimaryHeading>
  <UForm
    :state="logInState"
    class="space-y-4 p-4"
    @submit="onLogIn"
  >
    <UInput
      v-model="logInState.email"
      required
      type="email"
      autocomplete="email"
      icon="i-heroicons-at-symbol-20-solid"
      :placeholder="$t('auth.email')"
    />
    <UInput
      v-model="logInState.password"
      required
      type="password"
      autocomplete="current-password"
      icon="i-heroicons-key-20-solid"
      :placeholder="$t('auth.password')"
    />
    <UButton
      class="mx-auto block"
      type="submit"
    >
      {{ $t('auth.log_in') }}
    </UButton>
    <div class="mx-auto text-center">
      <ULink
        class="text-sm underline"
        :to="useNuxtApp().$localePath('/signup')"
      >
        {{ $t('auth.no_account') }}
      </ULink>
    </div>
  </UForm>
</template>
