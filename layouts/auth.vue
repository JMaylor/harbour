<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="absolute right-1 top-1 flex items-center gap-2">
      <UDarkModeToggle />
      <ULocaleSelect />
    </div>
    <div class="max-w-sm grow rounded border p-4">
      <BoatLogo class="mx-auto my-4 h-12" />
      <NuxtPage />
    </div>
  </div>
</template>
