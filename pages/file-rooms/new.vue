<script lang='ts' setup>
import type { SupabaseClient } from '@supabase/supabase-js'

const roomName = ref('')
const supabase = useSupabaseClient() as SupabaseClient<any>

async function onCreateNewRoom() {
  const { data, error } = await supabase.from('file_room').insert([{ name: roomName.value }])
}
</script>

<template>
  <form @submit.prevent="onCreateNewRoom">
    <BaseInput
      id="room-name"
      v-model="roomName"
      :label="$t('room_name')"
      required
    />
    <BaseButton>{{ $t('create') }}</BaseButton>
  </form>
</template>
