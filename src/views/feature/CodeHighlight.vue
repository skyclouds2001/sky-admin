<script setup lang="ts">
import { ElSpace, ElCard } from 'element-plus'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)

const HighlightJs = hljsVuePlugin.component
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">JavaScript</div>
      </template>
      <highlight-js language="javascript" code="const c = 1" />
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">TypeScript</div>
      </template>
      <highlight-js language="typescript" code="const d: number = 1" />
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
