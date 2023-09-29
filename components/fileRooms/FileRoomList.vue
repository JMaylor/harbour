<script lang='ts' setup>
import type { SupabaseClient } from '@supabase/supabase-js'

const supabase = useSupabaseClient() as SupabaseClient<any>

const { data: fileRooms, error } = await supabase.from('file_room').select('*')
</script>

<template>
  <p v-if="error">
    {{ error }}
  </p>
  <template v-else>
    <p>
      {{ $t('rooms_available') }}:
    </p>
    <ul>
      <li
        v-for="room in fileRooms"
        :key="room.file_room_id"
      >
        <NuxtLink :to="`/file-rooms/${room.file_room_id}`">
          {{ room.name }}
        </NuxtLink>
      </li>
    </ul>
  </template>
</template>
