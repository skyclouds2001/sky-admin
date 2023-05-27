<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import '@toast-ui/editor/dist/toastui-editor.css'
import chart from '@toast-ui/editor-plugin-chart'
import '@toast-ui/chart/dist/toastui-chart.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css'
import uml from '@toast-ui/editor-plugin-uml'

const el = ref<HTMLDivElement | null>(null)

let editor

onMounted(() => {
  editor = new Editor({
    el: el.value,
    previewStyle: 'vertical',
    height: '500px',
    initialValue: '',
    language: 'zh-CN',
    plugins: [chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml],
  })
})
</script>

<template>
  <div ref="el" class="bg-white w-full"></div>
</template>

<style scoped lang="scss"></style>
