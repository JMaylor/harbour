<template>
  <header class="border-primary sticky top-0 border-b backdrop-blur">
    <div class="container flex h-16 max-w-7xl items-center justify-between">
      <div class="flex items-center gap-2">
        <BoatLogo class="h-10" />
        <PrimaryHeading class="font-serif">
          Harbour
        </PrimaryHeading>
      </div>
      <div class="flex items-center gap-2">
        <UDarkModeToggle />
        <UButton
          color="gray"
          variant="ghost"
          to="https://github.com/JMaylor/harbour"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
        <ULocaleSelect />
      </div>
    </div>
  </header>
</template>
