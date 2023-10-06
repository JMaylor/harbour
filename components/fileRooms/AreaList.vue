<script lang='ts' setup>

const supabase = useTypedSupabaseClient()

const { data: areas, error } = await supabase.from('area').select('*')
</script>

<template>
  <p v-if="error">
    {{ error }}
  </p>
  <template v-else>
    <p>
      {{ $t('areas_available') }}:
    </p>
    <ul>
      <li
        v-for="area in areas"
        :key="area.id"
      >
        <NuxtLink :to="`/areas/${area.id}`">
          {{ area.name }}
        </NuxtLink>
      </li>
    </ul>
  </template>
</template>
