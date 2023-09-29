<script setup lang='ts'>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'

definePageMeta({ layout: 'auth' })

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
type Schema = z.output<typeof schema>

const state = ref({
  email: undefined,
  password: undefined,
})

const supabase = useSupabaseClient()
const toast = useToast()
async function submit(event: FormSubmitEvent<Schema>) {
  const { data, error } = await supabase.auth.signUp(event.data)

  const id = 'sign-up'

  if (error) {
    return toast.add({
      color: 'red',
      icon: 'i-heroicons-x-circle',
      id,
      title: 'Something went wrong...',
      description: error.message ?? 'Unknown error',
    })
  }

  if (data.user?.identities?.length === 0) {
    return toast.add({
      color: 'red',
      icon: 'i-heroicons-x-circle',
      id,
      title: 'User already exists!',
      description: 'Please log in instead',
    })
  }

  toast.add({
    icon: 'i-heroicons-check-circle',
    id,
    title: 'Nice to meet you!',
    description: 'Check your email for the confirmation link',
  })
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
    :state="state"
    :schema="schema"
    class="space-y-4 p-4"
    @submit="submit"
  >
    <UFormGroup
      :label="$t('auth.email')"
      name="email"
    >
      <UInput
        v-model="state.email"
        type="email"
        autocomplete="email"
        icon="i-heroicons-at-symbol-20-solid"
        :placeholder="$t('auth.example_email')"
      />
    </UFormGroup>
    <UFormGroup
      :label="$t('auth.password')"
      name="password"
    >
      <UInput
        v-model="state.password"
        type="password"
        autocomplete="new-password"
        icon="i-heroicons-key-20-solid"
        placeholder="********"
      />
    </UFormGroup>
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
