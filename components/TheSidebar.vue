<script setup lang='ts'>
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form'
import { z } from 'zod'
import type { Database } from '~/types/supabase'

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

  toggleIsOpen(false)

  navigateTo(useNuxtApp().$localePath(`/area/${data}`))
}
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'New Area',
    icon: 'i-heroicons-plus',
    iconClass: 'bg-primary',
    click: () => toggleIsOpen(true),
  },
]

const { data: areas } = await supabase.from('area').select('*')
const userAreas = ref(areas)
const channel = supabase
  .channel('any')
  .on<Database['public']['Tables']['area']['Row']>('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'area',
  }, payload => userAreas.value?.push(payload.new))
  .subscribe()

onUnmounted(() => channel.unsubscribe())

const linksToShow = computed(() => {
  if (!userAreas.value)
    return links
  return [
    ...links,
    ...userAreas.value.map(area => ({
      label: area.name,
      to: `/area/${area.id}`,
      icon: 'i-heroicons-folder',
    })),
  ]
})
</script>

<template>
  <UVerticalNavigation :links="linksToShow" />
  <TheCommandPalette
    :areas="userAreas"
    @new-area="toggleIsOpen(true)"
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
          :validate-on="['input', 'submit', 'change']"
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
