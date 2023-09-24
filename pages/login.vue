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
  <form
    class="flex flex-col gap-4 p-4"
    @submit.prevent="onLogIn"
  >
    <BaseInput
      id="email"
      v-model="logInState.email"
      required
      type="email"
      :label="$t('auth.email')"
      autocomplete="email"
    />
    <BaseInput
      id="password"
      v-model="logInState.password"
      required
      type="password"
      :label="$t('auth.password')"
      autocomplete="current-password"
    />
    <BaseButton type="submit">
      {{ $t('auth.log_in') }}
    </BaseButton>
    <NuxtLink
      class="text-center text-sm underline"
      :to="useNuxtApp().$localePath('/signup')"
    >
      {{ $t('auth.no_account') }}
    </NuxtLink>
  </form>
</template>
