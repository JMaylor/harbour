<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

const { locales, locale } = useI18n()
const availableLocales = (locales.value as LocaleObject[]).map(l => l.code)
const switchLocalePath = useSwitchLocalePath()

watch(locale, locale => navigateTo(switchLocalePath(locale)))
</script>

<template>
  <USelect
    v-model="locale"
    class="font-mono"
    :options="availableLocales"
  />
</template>
