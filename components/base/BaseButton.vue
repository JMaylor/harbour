<script setup lang="ts">
withDefaults(defineProps<{
  color?: 'red' | 'blue'
}>(), { color: 'blue' })
</script>

<template>
  <button
    class="rounded px-4 py-2 text-white"
    :class="{
      'bg-red-700 hover:bg-red-500': color === 'red',
      'bg-sky-700 hover:bg-sky-500': color === 'blue',
    }"
  >
    <slot />
  </button>
</template>
