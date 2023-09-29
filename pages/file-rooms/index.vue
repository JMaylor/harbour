<template>
  <NuxtLink :to="useNuxtApp().$localePath('/file-rooms/new')">
    {{ $t('create_new_room') }}
  </NuxtLink>
  <Suspense>
    <template #fallback>
      <p>
        {{ $t('loading_rooms') }}
      </p>
    </template>

    <template #default>
      <FileRoomList />
    </template>
  </Suspense>

  <NuxtPage />
</template>
