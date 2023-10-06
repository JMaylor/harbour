<script lang='ts' setup>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'

const [isOpen, toggleIsOpen] = useToggle()

const schema = z.object({ name: z.string().trim().min(1) })
type Schema = z.output<typeof schema>
const state = reactive({ name: undefined })

const supabase = useTypedSupabaseClient()
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data, error } = await supabase.rpc('create_area_and_admin', { p_name: event.data.name })

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
  <UButton
    icon="i-heroicons-plus-20-solid"
    label="Create New Area"
    variant="outline"
    @click="toggleIsOpen(true)"
  />
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        Create New Area
      </template>
      <template #default>
        <UForm
          id="create-area-form"
          :state="state"
          :schema="schema"
          class="space-y-4 p-4"
          @submit="onSubmit"
        >
          <UFormGroup
            :label="$t('area_name')"
            name="name"
          >
            <UInput
              v-model="state.name"
            />
          </UFormGroup>
        </UForm>
      </template>
      <template #footer>
        <UButton
          label="Create"
          type="submit"
          form="create-area-form"
        />
      </template>
    </UCard>
  </UModal>
</template>
