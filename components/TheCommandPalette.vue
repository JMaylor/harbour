<script setup lang='ts'>
import type { Database } from '~/types/supabase'

const props = defineProps<{
  areas: Database['public']['Tables']['area']['Row'][]
}>()

const emit = defineEmits<{
  newArea: []
}>()

const [isOpen, toggleIsOpen] = useToggle()
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: toggleIsOpen,
  },
})

const { metaSymbol } = useShortcuts()
const groups = computed(() => [
  {
    key: 'areas',
    commands: props.areas.map(area => ({
      id: area.id,
      label: area.name,
      to: `/area/${area.id}`,
    })),
  },
  {
    key: 'actions',
    commands: [
      {
        id: 'new-area',
        label: 'New Area',
        icon: 'i-heroicons-plus',
        click: () => {
          toggleIsOpen(false)
          setTimeout(() => {
            emit('newArea')
          }, 250)
        },
        shortcuts: [metaSymbol.value, 'N'],
      },
    ],
  },
])

function onSelect(option: any) {
  if (option.click) {
    option.click()
  }

  else if (option.to) {
    navigateTo(option.to)
    toggleIsOpen(false)
  }

  else if (option.href) {
    window.open(option.href, '_blank')
  }
}
</script>

<template>
  <div>
    <UModal v-model="isOpen">
      <UCommandPalette
        :groups="groups"
        @update:model-value="onSelect"
      />
    </UModal>
  </div>
</template>
