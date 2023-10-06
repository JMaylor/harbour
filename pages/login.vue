<script setup lang='ts'>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'

useHead({ title: 'Login' })
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
const { isLoading, mutate: login } = useMutation({
  mutationFn: async (credentials: Schema) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials)
    if (error)
      throw new Error(error.message)
    return data
  },
})
async function onSubmit(event: FormSubmitEvent<Schema>) {
  login(event.data, {
    onError: (error: any) => {
      useErrorToast({
        title: 'Something went wrong...',
        description: error?.message ?? String(error),
      })
    },
    onSuccess: (data) => {
      useSuccessToast({
        title: 'Welcome back!',
        description: `Nice to see you again, ${data.user.email}`,
      })
      navigateTo(useNuxtApp().$localePath('/'))
    },
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
    {{ $t('auth.log_in') }}
  </PrimaryHeading>
  <UForm
    :state="state"
    :schema="schema"
    class="space-y-4 p-4"
    :validate-on="['submit']"
    @submit="onSubmit"
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
