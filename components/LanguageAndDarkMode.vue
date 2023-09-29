<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

const { locales, locale } = useI18n()
const availableLocales = (locales.value as LocaleObject[]).map(l => l.code)
const switchLocalePath = useSwitchLocalePath()
// const localeToSwitchTo = computed(() => (locales.value as LocaleObject[]).find(l => l.code !== locale.value))

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

watch(locale, locale => navigateTo(switchLocalePath(locale)))
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
  <USelect
    v-model="locale"
    :options="availableLocales"
  />
</template>
