<script setup lang="ts">
withDefaults(defineProps<{
  color?: 'red' | 'blue'
}>(), { color: 'blue' })
</script>

<template>
  <button
    :class="{
      'bg-red-500': color === 'red',
      'bg-blue-500': color === 'blue',
    }"
  >
    <slot />
  </button>
</template>
