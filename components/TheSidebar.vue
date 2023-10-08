<script setup lang='ts'>
import type { Database } from '~/types/supabase'

const [isOpen, toggleIsOpen] = useToggle()

const supabase = useTypedSupabaseClient()
const supabaseUser = useSupabaseUser()

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
      to: `/area/${area.area_id}`,
      icon: 'i-heroicons-folder',
    })),
  ]
})

const signOutLink = {
  label: 'Sign out',
  icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
  iconClass: 'bg-primary',
  click: onSignOut,
}
async function onSignOut() {
  await supabase.auth.signOut()
  navigateTo(useNuxtApp().$localePath('/login'))
}
</script>

<template>
  <aside class="sticky top-[calc(4rem+1px)] -mx-4 flex h-full max-h-[calc(100vh-4rem-1px)] flex-col justify-between overflow-y-auto px-4 py-8">
    <UVerticalNavigation :links="linksToShow" />
    <div>
      <p>{{ supabaseUser?.user_metadata.name }}</p>
      <p class="truncate">
        {{ supabaseUser?.email }}
      </p>
      <UVerticalNavigation :links="[signOutLink]" />
    </div>
  </aside>
  <TheCommandPalette
    :areas="userAreas"
    @new-area="toggleIsOpen(true)"
  />
  <NewAreaModal v-model="isOpen" />
</template>
