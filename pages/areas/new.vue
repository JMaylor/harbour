<script lang='ts' setup>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'
import type { Database } from '~/types/supabase'

const schema = z.object({ name: z.string().trim().min(1) })
type Schema = z.output<typeof schema>
const state = reactive({ name: undefined })

const supabase = useSupabaseClient<Database>()
const toast = useToast()
async function submit(event: FormSubmitEvent<Schema>) {
  const { data, error } = await supabase.rpc('create_area_and_admin', { p_name: state.name })

  if (error) {
    return toast.add({
      color: 'red',
      icon: 'i-heroicons-x-circle',
      title: 'Could not create the area!',
      description: error.message,
    })
  }

  toast.add({
    icon: 'i-heroicons-check-circle',
    title: 'New area created!',
    description: `Taking you to ${state.name}... ${data}`,
  })

  navigateTo(useNuxtApp().$localePath(`/areas/${data}`))
}
</script>

<template>
  <UForm
    :state="state"
    :schema="schema"
    class="space-y-4 p-4"
    @submit="submit"
  >
    <UFormGroup
      :label="$t('area_name')"
      name="name"
    >
      <UInput
        v-model="state.name"
      />
    </UFormGroup>
    <UButton
      class="mx-auto block"
      type="submit"
    >
      {{ $t('create') }}
    </UButton>
  </UForm>
</template>
