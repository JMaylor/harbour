<template>
  <TheHeader />
  <main class="container h-full max-w-7xl">
    <div class="grid h-full grid-cols-12 gap-8">
      <div class="col-span-2">
        <TheSidebar />
      </div>
      <div class="col-span-8 py-8">
        <NuxtPage />
      </div>
    </div>
  </main>
</template>
