<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'

let editor: AiEditor | null = null

const el = shallowRef<HTMLDivElement | null>(null)

onMounted(() => {
  editor = new AiEditor({
    element: el.value as HTMLDivElement,
    placeholder: '点击输入内容...',
    content: '',
  })
})

onUnmounted(() => {
  editor?.destroy()
})
</script>

<template>
  <div ref="el" class="border border-gray-400"></div>
</template>

<style scoped lang="scss"></style>
