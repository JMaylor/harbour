<script lang='ts' setup>
const props = defineProps<{
  path: string
}>()

const supabase = useTypedSupabaseClient()

const { isLoading, mutate: uploadFiles } = useMutation({
  mutationFn: async (files: File[]) => {
    for (const file of files) {
      supabase
        .storage
        .from('documents')
        .upload(`${props.path}/${file.name}`, file).then(({ data, error }) => {
          if (data) {
            useSuccessToast({
              title: file.name,
              description: 'Successfully uploaded file.',
            })
          }
          else {
            useErrorToast({
              title: file.name,
              description: error.message,
            })
          }
        })
    }
  },
})

function onDrop(files: File[] | null) {
  if (!files)
    return

  if (isLoading.value)
    return

  if (files.some(file => file.type === '')) {
    return useErrorToast({
      title: 'Invalid Upload',
      description: 'Please do not upload entire folders.',
    })
  }

  uploadFiles(files)
}

const dropZoneRef = ref<HTMLDivElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <div
    ref="dropZoneRef"
    class="rounded-xl border p-8"
    :class="{
      'border-primary': isOverDropZone,
    }"
  >
    Drop files here
  </div>
</template>
