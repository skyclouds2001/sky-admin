<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import type { IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

const el = shallowRef<IDomEditor>()

const context = ref('')

const toolbarConfig = {}

const editorConfig = {
  placeholder: '请输入内容...',
}

const handleCreated = (e: IDomEditor) => {
  el.value = e
}

onMounted(() => {
  setTimeout(() => {
    context.value = `${Date.now()}: hello`
  }, 1000)
})

onBeforeUnmount(() => {
  if (el.value) {
    el.value.destroy()
  }
})
</script>

<template>
  <div class="border border-gray-400">
    <Toolbar class="border-b border-gray-400" :editor="el" :default-config="toolbarConfig" mode="default" />
    <Editor v-model="context" class="h-[500px] overflow-y-hidden" :default-config="editorConfig" mode="default" @onCreated="handleCreated" />
  </div>
</template>

<style scoped lang="scss"></style>
