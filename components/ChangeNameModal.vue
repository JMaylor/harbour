<script lang='ts' setup>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'

const modelValue = defineModel<boolean>()
const supabase = useTypedSupabaseClient()
const supabaseUser = useSupabaseUser()

const schema = z.object({ name: z.string().trim().min(1) })
type Schema = z.output<typeof schema>

const { data: profile, error: profileError } = await supabase.from('profiles').select('name').eq('user_id', supabaseUser.value!.id).single()
if (profileError) {
  useErrorToast({
    title: 'Oops',
    description: 'Something went wrong while fetching your user profile.',
  })
}

const state = reactive({ name: profile?.name })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await supabase
    .from('profiles')
    .update({ name: event.data.name })
    .eq('user_id', supabaseUser.value!.id)
    .select()

  if (error) {
    return useErrorToast({
      title: 'Could not change your name!',
      description: error.message,
    })
  }

  useSuccessToast({ title: 'Name changed!' })

  modelValue.value = false
}
</script>

<template>
  <UModal
    v-model="modelValue"
    :ui="{
      width: 'sm:max-w-sm',
    }"
  >
    <UCard>
      <template #header>
        Change Name
      </template>
      <template #default>
        <UForm
          id="change-name-form"
          :state="state"
          :schema="schema"
          class="space-y-4 p-4"
          :validate-on="['input', 'submit', 'change']"
          @submit="onSubmit"
        >
          <UFormGroup
            required
            label="Name"
            name="name"
          >
            <UInput
              v-model="state.name"
              autocomplete="off"
            />
          </UFormGroup>
        </UForm>
      </template>
      <template #footer>
        <UButton
          label="Change Name"
          type="submit"
          form="change-name-form"
        />
      </template>
    </UCard>
  </UModal>
</template>
