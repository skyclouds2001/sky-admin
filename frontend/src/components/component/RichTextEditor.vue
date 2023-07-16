<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import type { IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

const el = shallowRef<IDomEditor>()

const context = ref('')

const toolbarConfig = {}

const editorConfig = {
  placeholder: '请输入内容...',
}

const handleCreated = (e: IDomEditor): void => {
  el.value = e
}

onBeforeUnmount(() => {
  el.value?.destroy()
})
</script>

<template>
  <div class="border border-gray-400">
    <Toolbar class="border-b border-gray-400" :editor="el" :default-config="toolbarConfig" mode="default" />
    <!-- eslint-disable-next-line vue/v-on-event-hyphenation -->
    <Editor v-model="context" class="h-[500px] overflow-y-hidden" :default-config="editorConfig" mode="default" @onCreated="handleCreated" />
  </div>
</template>

<style scoped lang="scss"></style>
