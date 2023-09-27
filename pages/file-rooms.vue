<template>
  <SecondaryHeading>{{ $t('file_rooms') }}</SecondaryHeading>
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
