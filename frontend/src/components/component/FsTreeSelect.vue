<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElTreeSelect } from 'element-plus'

type Data =
  | {
      label: string
      value: FileSystemFileHandle
    }
  | {
      label: string
      value: FileSystemDirectoryHandle
      children: Data[]
    }

const props = defineProps<{
  modelValue: FileSystemFileHandle | null
}>()

const emits = defineEmits<{
  'update:modelValue': [value: FileSystemFileHandle | null]
}>()

const isSupported = 'showDirectoryPicker' in window

const file = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

const files = ref<Data[]>([])

const loadFile = async (): Promise<void> => {
  if (!isSupported) {
    console.error('Current Browser does not support for File System Access API')
  }

  const traverse = async (handle: FileSystemDirectoryHandle): Promise<Data> => {
    const children: Data[] = []

    // @ts-expect-error - File System Access API
    for await (const [, value] of handle) {
      if (value.kind === 'directory') {
        children.push(await traverse(value as FileSystemDirectoryHandle))
      }
      if (value.kind === 'file') {
        children.push({
          label: value.name,
          value: value as FileSystemFileHandle,
        })
      }
    }

    return {
      label: handle.name,
      value: handle,
      children,
    }
  }

  // @ts-expect-error - File System Access API
  const handle = await window.showDirectoryPicker()

  files.value.push(await traverse(handle))
}

defineOptions({
  name: 'FileSystemTreeSelect',
  inheritAttrs: false,
})

defineExpose({
  isSupported,
  file,
  files,
  loadFile,
})
</script>

<template>
  <el-tree-select v-model="file" value-key="name" @visible-change="loadFile" />
</template>

<style scoped lang="scss"></style>
