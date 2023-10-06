<script setup lang='ts'>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'

definePageMeta({ layout: 'auth' })

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
})
type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

const supabase = useTypedSupabaseClient()
const toast = useToast()
const [isLoading, toggleIsLoading] = useToggle()
async function submit(event: FormSubmitEvent<Schema>) {
  toggleIsLoading(true)

  const { error, data } = await supabase.auth.signInWithPassword(event.data)

  if (error) {
    toggleIsLoading(false)
    return toast.add({
      color: 'red',
      icon: 'i-heroicons-x-circle',
      title: 'Something went wrong...',
      description: error.message,
    })
  }

  toast.add({
    icon: 'i-heroicons-check-circle',
    title: 'Welcome back!',
    description: `Nice to see you again, ${data.user.email}.`,
  })

  navigateTo(useNuxtApp().$localePath('/'))
}

const user = useSupabaseUser()
watch(user, () => {
  if (user.value)
    return navigateTo(useNuxtApp().$localePath('/'))
}, { immediate: true })
</script>

<template>
  <PrimaryHeading class="text-center">
    {{ $t('auth.log_in') }}
  </PrimaryHeading>
  <UForm
    :state="state"
    :schema="schema"
    class="space-y-4 p-4"
    :validate-on="['submit']"
    @submit="submit"
  >
    <UFormGroup
      required
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
      required
      :label="$t('auth.password')"
      name="password"
    >
      <UInput
        v-model="state.password"
        type="password"
        autocomplete="current-password"
        icon="i-heroicons-key-20-solid"
        placeholder="********"
      />
    </UFormGroup>
    <div class="flex justify-center">
      <UButton
        type="submit"
        :loading="isLoading"
      >
        {{ $t('auth.log_in') }}
      </UButton>
    </div>
    <div class="mx-auto text-center">
      <UButton
        variant="link"
        color="sky"
        :to="useNuxtApp().$localePath('/signup')"
      >
        {{ $t('auth.no_account') }}
      </UButton>
    </div>
  </UForm>
</template>
