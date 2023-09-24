<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <ul class="absolute right-0 top-0">
    <li
      v-for="l in (locales as LocaleObject[])"
      :key="l.code"
      :class="{
        'font-bold': l.code === locale,
      }"
    >
      <NuxtLink
        :to="switchLocalePath(l.code)"
      >
        {{ l.name }}
      </NuxtLink>
    </li>
  </ul>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
