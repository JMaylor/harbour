<script setup lang='ts'>
import type { Database } from '~/types/supabase'

const isNewAreaModalOpen = ref(false)
const isChangeNameModalOpen = ref(false)
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
    click: () => isNewAreaModalOpen.value = true,
  },
]

const { data: areas } = await supabase.from('area').select('*')
const { data: profile } = await supabase.from('profiles').select('name').eq('user_id', supabaseUser.value!.id).single()
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

const bottomLinks = computed(() => [
  {
    label: profile?.name,
    icon: 'i-heroicons-user',
    click: () => isChangeNameModalOpen.value = true,
  },
  {
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
    iconClass: 'bg-primary',
    click: onSignOut,
  },
])

async function onSignOut() {
  await supabase.auth.signOut()
  navigateTo(useNuxtApp().$localePath('/login'))
}
</script>

<template>
  <aside class="sticky top-[calc(4rem+1px)] -mx-4 flex h-full max-h-[calc(100vh-4rem-1px)] flex-col justify-between overflow-y-auto px-4 py-8">
    <UVerticalNavigation :links="linksToShow" />
    <div>
      <UVerticalNavigation :links="bottomLinks" />
    </div>
  </aside>
  <TheCommandPalette
    :areas="userAreas"
    @new-area="isNewAreaModalOpen = true"
  />
  <NewAreaModal v-model="isNewAreaModalOpen" />
  <ChangeNameModal v-model="isChangeNameModalOpen" />
</template>
