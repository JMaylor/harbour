<template>
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />
    <path
      d="M20.85,18.91C20.8,15,21,8.68,13,2c0,0,1,12-10,16a25.36,25.36,0,0,0,13,4.6S20.89,22.6,20.85,18.91Z"
      class="fill-primary-600"
    />
    <path
      d="M1,23v5s12.25,3.69,21,1c7.76-2.39,9-11,9-11C21,23,18,23,1,23Z"
      class="boat-outline"
    />
    <path
      d="M20.85,18.91C21,15.18,21,8.68,13,2c0,0,1,12-10,16a25.36,25.36,0,0,0,13,4.6"
      class="boat-outline"
    />
    <polyline
      points="13 2 6 2 9 4.5 6 7 12 7"
      class="boat-outline"
    />
  </svg>
</template>

<style lang="scss" scoped>
.boat-outline {
  @apply fill-none stroke-gray-900 stroke-2 [stroke-linecap:round] [stroke-linejoin:round] dark:stroke-gray-200;
}
</style>
