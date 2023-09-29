<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localeToSwitchTo = computed(() => (locales.value as LocaleObject[]).find(l => l.code !== locale.value))

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <button
    type="button"
    aria-label="theme"
    class="flex items-center"
    @click="isDark = !isDark"
  >
    <Icon
      class="h-5 w-5"
      :name="isDark ? 'heroicons:moon-20-solid' : 'heroicons:sun-20-solid'"
    />
  </button>
  <NuxtLink
    v-if="localeToSwitchTo"
    :to="switchLocalePath(localeToSwitchTo.code)"
    :title="$t('switch_language')"
  >
    <img
      class="h-10"
      :src="`/flags/${locale}.svg`"
      :alt="`Flag - ${locale}`"
    >
  </NuxtLink>
</template>
