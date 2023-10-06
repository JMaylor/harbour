<script setup>
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },

]
</script>

<template>
  <UVerticalNavigation :links="links" />
</template>
