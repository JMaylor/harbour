<script setup lang="ts">
const supabase = useTypedSupabaseClient()

async function onSignOut() {
  await supabase.auth.signOut()
  navigateTo(useNuxtApp().$localePath('/login'))
}
</script>

<template>
  <header class="border-primary sticky top-0 border-b backdrop-blur">
    <div class="container flex h-16 max-w-7xl items-center justify-between">
      <div class="flex items-center gap-2">
        <BoatLogo class="h-10" />
        <PrimaryHeading class="font-serif">
          Harbour
        </PrimaryHeading>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          icon="i-heroicons-arrow-left-on-rectangle-20-solid"
          variant="link"
          @click="onSignOut"
        >
          Sign out
        </UButton>
        <UDarkModeToggle />
        <UButton
          color="gray"
          variant="ghost"
          to="https://github.com/JMaylor/harbour"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
        <ULocaleSelect />
      </div>
    </div>
  </header>
</template>
