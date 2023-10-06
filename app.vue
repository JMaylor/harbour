<script setup lang='ts'>
useHead({ titleTemplate: titleChunk => titleChunk ? `${titleChunk} | Harbour` : 'Harbour' })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications />
</template>
