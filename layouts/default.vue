<script setup lang="ts">
const supabase = useSupabaseClient()

async function onSignOut() {
  await supabase.auth.signOut()
  navigateTo(useNuxtApp().$localePath('/login'))
}
</script>

<template>
  <header class="border-b shadow dark:shadow-none">
    <div class="container flex h-12 max-w-7xl items-center justify-between">
      <PrimaryHeading>
        Harbour
      </PrimaryHeading>
      <button @click="onSignOut">
        Sign out
      </button>
    </div>
  </header>
  <main class="container max-w-7xl">
    <NuxtLink to="/file-rooms">
      Rooms
    </NuxtLink>
    <NuxtPage />
  </main>
</template>
