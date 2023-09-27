<script lang='ts' setup>
const roomName = ref('')
const supabase = useSupabaseClient()

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
