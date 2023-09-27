<script setup lang="ts">
const supabase = useSupabaseClient()

async function onSignOut() {
  await supabase.auth.signOut()
  navigateTo(useNuxtApp().$localePath('/login'))
}
</script>

<template>
  <button @click="onSignOut">
    Sign out
  </button>
</template>
