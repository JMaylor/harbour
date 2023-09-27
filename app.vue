<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localeToSwitchTo = computed(() => (locales.value as LocaleObject[]).find(l => l.code !== locale.value))
</script>

<template>
  <NuxtLink
    v-if="localeToSwitchTo"
    class="absolute right-1 top-0"
    :to="switchLocalePath(localeToSwitchTo.code)"
  >
    <img
      class="h-10"
      :src="`/flags/${locale}.svg`"
      :alt="$t('switch_language')"
    >
  </NuxtLink>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
