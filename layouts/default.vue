<script setup lang="ts">
const supabase = useTypedSupabaseClient()

async function onSignOut() {
  await supabase.auth.signOut()
  navigateTo(useNuxtApp().$localePath('/login'))
}
</script>

<template>
  <header class="border-primary sticky top-0 border-b backdrop-blur">
    <div class="container flex h-12 max-w-7xl items-center justify-between">
      <div class="flex items-center gap-2">
        <BoatLogo class="h-8 w-8" />
        <PrimaryHeading class="font-serif">
          Harbour
        </PrimaryHeading>
      </div>
      <div class="flex items-center gap-2">
        <UButton @click="onSignOut">
          Sign out
        </UButton>
        <ClientOnly>
          <LanguageAndDarkMode />
        </ClientOnly>
      </div>
    </div>
  </header>
  <nav class="container max-w-7xl">
    <NuxtLink to="/areas">
      Areas
    </NuxtLink>
  </nav>
  <main class="container max-w-7xl">
    <NuxtPage />
  </main>
</template>
