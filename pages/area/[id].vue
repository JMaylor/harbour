<script setup lang='ts'>
import type { FileObject, StorageError } from '@supabase/storage-js'

const route = useRoute()
const id = route.params.id as string

const supabase = useTypedSupabaseClient()

const files = ref<FileObject[]>()
const filteredFiles = computed(() => files.value?.filter(f => f.name !== '.emptyFolderPlaceholder'))
const storageError = ref<StorageError>()

const { data: areaInfo } = await supabase.from('area').select('*').eq('area_id', id).single()
const timeAgo = useTimeAgo(areaInfo!.created_at)
const { data: members } = await supabase.from('vw_area_members').select('*').eq('area_id', id)
const path = ref(id)
watch(path, async (path) => {
  const { data, error } = await supabase.storage.from('documents').list(path)
  if (error)
    storageError.value = error
  else
    files.value = data
}, { immediate: true })

async function onClick(item: FileObject) {
  if (item.id) {
    const { data, error } = await supabase.storage.from('documents').createSignedUrl(`${path.value}/${item.name}`, 60, { download: true })
    if (error)
      console.error(error)

    else if (data)
      window.open(data.signedUrl, '_blank')
  }
  else {
    const pathArray = path.value === '' ? [] : path.value.split('/')
    pathArray.push(item.name)
    path.value = pathArray.join('/')
  }
}
</script>

<template>
  <PrimaryHeading>{{ areaInfo?.name }}</PrimaryHeading>
  <span class="text-primary text-sm">Room created {{ timeAgo }}</span>
  <SecondaryHeading>
    Members
  </SecondaryHeading>
  <ul
    v-if="members"
    class="space-y-2 p-2"
  >
    <li
      v-for="member in members"
      :key="member.user_id!"
      class="flex items-center gap-2"
    >
      <UAvatar
        :icon="member.is_admin ? 'i-heroicons-key-20-solid' : 'i-heroicons-user-20-solid'"
      />
      <span>{{ member.name }}</span>
    </li>
  </ul>
  <FileUpload :path="path" />
  <p v-if="storageError">
    {{ storageError.message }}
  </p>
  <ul v-else-if="filteredFiles">
    <li
      v-for="item in filteredFiles"
      :key="item.name"
    >
      <button
        type="button"
        @click="onClick(item)"
      >
        {{ item.name }}
      </button>
    </li>
  </ul>
</template>
