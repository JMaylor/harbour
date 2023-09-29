<script lang='ts' setup>
defineOptions({ inheritAttrs: false })
defineProps<{
  label: string
  id: string
}>()
const modelValue = defineModel()
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      v-model="modelValue"
      class="rounded border p-3 hover:border-sky-500 dark:bg-black"
    >
  </div>
</template>
