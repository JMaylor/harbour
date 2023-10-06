<template>
  <TheHeader />
  <main class="container max-w-7xl">
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-2">
        <aside class="sticky top-[calc(4rem+1px)] -mx-4 block max-h-[calc(100vh-4rem-1px)] overflow-y-auto px-4 py-8">
          <TheSidebar />
        </aside>
      </div>
      <div class="col-span-8 py-8">
        <NuxtPage />
      </div>
    </div>
  </main>
</template>
