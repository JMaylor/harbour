<script setup lang='ts'>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'

definePageMeta({ layout: 'auth' })

function passwordRequirements(password: string) {
  const hasLowercase = /[a-z]+/.test(password)
  const hasUppercase = /[A-Z]+/.test(password)
  const hasLength = password.length >= 8
  const hasNumberOrSpecialCharacter = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)

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

function passwordMeetsAllRequirements(password: string) {
  return passwordRequirements(password).every(requirement => requirement.meetsRequirement)
}

const schema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: '' }).refine(val => passwordMeetsAllRequirements(val ?? ''), { message: ' ' }),
})
type Schema = z.output<typeof schema>

const state = ref({
  email: undefined,
  password: '',
})

const passwordRequirementState = computed(() => passwordRequirements(state.value.password))
const passwordValid = computed(() => passwordMeetsAllRequirements(state.value.password))

const supabase = useTypedSupabaseClient()
const toast = useToast()
const [isLoading, toggleIsLoading] = useToggle()
async function submit(event: FormSubmitEvent<Schema>) {
  toggleIsLoading(true)
  const { data, error } = await supabase.auth.signUp(event.data)

  if (error) {
    toggleIsLoading(false)
    return toast.add({
      color: 'red',
      icon: 'i-heroicons-x-circle',
      title: 'Something went wrong...',
      description: error.message,
    })
  }

  if (data.user?.identities?.length === 0) {
    toggleIsLoading(false)
    return toast.add({
      color: 'red',
      icon: 'i-heroicons-x-circle',
      title: 'User already exists!',
      description: 'Please log in instead',
    })
  }

  toast.add({
    icon: 'i-heroicons-check-circle',
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
