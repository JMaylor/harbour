<script setup lang='ts'>
import type { Database } from '~/types/supabase'

const props = defineProps<{
  areas?: Database['public']['Tables']['area']['Row'][] | null
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
  alt_n: {
    usingInput: true,
    handler: () => {
      toggleIsOpen(false)
      setTimeout(() => {
        emit('newArea')
      }, 250)
    },
  },
})

const groups = computed(() => [
  {
    key: 'areas',
    label: 'Areas',
    commands: props.areas?.map(area => ({
      id: area.area_id,
      icon: 'i-heroicons-folder',
      label: area.name,
      to: `/area/${area.area_id}`,
    })),
  },
  {
    key: 'actions',
    label: 'Actions',
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
        shortcuts: ['Alt', 'N'],
        iconClass: 'bg-primary',
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
        :loading="!areas"
        :groups="groups"
        @update:model-value="onSelect"
      />
    </UModal>
  </div>
</template>
