<script setup lang="ts">
const supabase = useTypedSupabaseClient()

async function onSignOut() {
  await supabase.auth.signOut()
  navigateTo(useNuxtApp().$localePath('/login'))
}
</script>

<template>
  <header class="sticky top-0 border-b backdrop-blur">
    <div class="container flex h-12 max-w-7xl items-center justify-between">
      <PrimaryHeading>
        Harbour
      </PrimaryHeading>
      <div class="flex items-center gap-2">
        <button @click="onSignOut">
          Sign out
        </button>
        <ClientOnly>
          <LanguageAndDarkMode />
        </ClientOnly>
      </div>
    </div>
  </header>
  <main class="container max-w-7xl">
    <NuxtLink to="/file-rooms">
      Rooms
    </NuxtLink>
    <NuxtPage />
  </main>
</template>
