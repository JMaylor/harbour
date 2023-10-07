<script setup lang='ts'>
import type { FileObject, StorageError } from '@supabase/storage-js'

const route = useRoute()
const id = route.params.id as string

const supabase = useTypedSupabaseClient()

const files = ref<FileObject[]>()
const filteredFiles = computed(() => files.value?.filter(f => f.name !== '.emptyFolderPlaceholder'))
const storageError = ref<StorageError>()

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
    const { data, error } = await supabase.storage.from('documents').download(`${path.value}/${item.name}`)
    if (error) {
      console.error(error)
    }
    else if (data) {
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(data)
      a.download = item.name // Set the desired file name

      // Programmatically click the <a> element to trigger the download
      a.click()
    }
  }
  else {
    const pathArray = path.value === '' ? [] : path.value.split('/')
    pathArray.push(item.name)
    path.value = pathArray.join('/')
  }
}
</script>

<template>
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
