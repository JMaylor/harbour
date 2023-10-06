<template>
  <CreateNewArea />
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
