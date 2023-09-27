<script lang='ts' setup>
const supabase = useSupabaseClient()

const { data: fileRooms, error } = await supabase.from('file_room').select('*')
</script>

<template>
  <p v-if="error">
    {{ error }}
  </p>
  <p v-else>
    {{ $t('rooms_available') }}: {{ fileRooms?.length }}
  </p>
</template>
