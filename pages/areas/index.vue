<template>
  <NuxtLink :to="useNuxtApp().$localePath('/areas/new')">
    {{ $t('create_new_area') }}
  </NuxtLink>
  <Suspense>
    <template #fallback>
      <p>
        {{ $t('loading_areas') }}
      </p>
    </template>

    <template #default>
      <AreaList />
    </template>
  </Suspense>

  <NuxtPage />
</template>
