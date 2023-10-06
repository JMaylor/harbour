<script lang='ts' setup>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'

const [isOpen, toggleIsOpen] = useToggle()

const schema = z.object({ name: z.string().trim().min(1) })
type Schema = z.output<typeof schema>
const state = reactive({ name: undefined })

const supabase = useTypedSupabaseClient()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data, error } = await supabase.rpc('create_area_and_admin', { p_name: event.data.name })

  if (error) {
    return useErrorToast({
      title: 'Could not create the area!',
      description: error.message,
    })
  }

  useSuccessToast({
    title: 'New area created!',
    description: `Taking you to ${state.name}... ${data}`,
  })

  navigateTo(useNuxtApp().$localePath(`/area/${data}`))
}
</script>

<template>
  <UButton
    icon="i-heroicons-plus-20-solid"
    :label="$t('create_new_area')"
    variant="outline"
    @click="toggleIsOpen(true)"
  />
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        {{ $t('create_new_area') }}
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
            required
            :label="$t('area_name')"
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
          label="Create"
          type="submit"
          form="create-area-form"
        />
      </template>
    </UCard>
  </UModal>
</template>
