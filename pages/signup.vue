<script setup lang='ts'>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'

useHead({ title: 'Sign up' })
definePageMeta({ layout: 'auth' })

function passwordRequirements(password?: string) {
  const hasLowercase = password && /[a-z]+/.test(password)
  const hasUppercase = password && /[A-Z]+/.test(password)
  const hasLength = password && password.length >= 8
  const hasNumberOrSpecialCharacter = password && /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)

  return [
    {
      message: 'At least one lowercase letter',
      meetsRequirement: hasLowercase,
    },
    {
      message: 'At least one uppercase letter',
      meetsRequirement: hasUppercase,
    },
    {
      message: 'At least 8 characters',
      meetsRequirement: hasLength,
    },
    {
      message: 'At least one number or symbol',
      meetsRequirement: hasNumberOrSpecialCharacter,
    },
  ]
}

function passwordMeetsAllRequirements(password?: string) {
  return passwordRequirements(password).every(requirement => requirement.meetsRequirement)
}

const schema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: '' }).refine(val => passwordMeetsAllRequirements(val ?? ''), { message: ' ' }),
  name: z.string().min(2),
})
type Schema = z.output<typeof schema>

const state = ref({
  email: undefined,
  password: undefined,
  name: undefined,
})

const passwordRequirementState = computed(() => passwordRequirements(state.value.password))
const passwordValid = computed(() => passwordMeetsAllRequirements(state.value.password))

const supabase = useTypedSupabaseClient()
const { isLoading, mutate: signUp } = useMutation({
  mutationFn: async (credentials: Schema) => {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: { data: { name: credentials.name } },
    })
    if (error)
      throw new Error(error.message)
    if (data.user?.identities?.length === 0)
      throw new Error('User already exists')
    return data
  },
})
async function onSubmit(event: FormSubmitEvent<Schema>) {
  signUp(event.data, {
    onError: (error: any) => {
      useErrorToast({
        title: 'Something went wrong...',
        description: error?.message ?? String(error),
      })
    },
    onSuccess: (_data, { name }) => {
      useSuccessToast({
        title: `Nice to meet you, ${name}!`,
        description: 'Check your email for the confirmation link',
      })
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
  <h1 class="text-center text-4xl">
    {{ $t('auth.sign_up') }}
  </h1>
  <UForm
    :state="state"
    :schema="schema"
    class="space-y-4 p-4"
    :validate-on="['submit']"
    @submit="onSubmit"
  >
    <UFormGroup
      required
      label="Name"
      name="name"
    >
      <UInput
        v-model="state.name"
        autocomplete="name"
        icon="i-heroicons-user-20-solid"
        placeholder="John Doe"
      />
    </UFormGroup>
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
        autocomplete="new-password"
        icon="i-heroicons-key-20-solid"
        placeholder="********"
      />
    </UFormGroup>
    <ul class="text-sm">
      <li
        v-for="requirement in passwordRequirementState"
        :key="requirement.message"
        :class="requirement.meetsRequirement ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'"
      >
        <Icon
          :name="requirement.meetsRequirement ? 'i-heroicons-check-20-solid' : 'i-heroicons-x-mark-20-solid'"
          class="mr-2 inline-block h-5 w-5"
        /><span>{{ requirement.message }}</span>
      </li>
    </ul>
    <div class="mx-auto text-center">
      <UButton
        type="submit"
        :disabled="!passwordValid"
        :loading="isLoading"
      >
        {{ $t('auth.sign_up') }}
      </UButton>
    </div>
    <div class="mx-auto text-center">
      <UButton
        variant="link"
        color="sky"
        :to="useNuxtApp().$localePath('/login')"
      >
        {{ $t('auth.already_got_account') }}
      </UButton>
    </div>
  </UForm>
</template>
