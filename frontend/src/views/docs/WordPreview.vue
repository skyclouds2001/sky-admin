<script setup lang="ts">
import { DEMO_WORD_SRC } from '@/config'
import { generateDocumentLink } from '@/util'
</script>

<template>
  <iframe class="word-preview" name="word-preview" title="word-preview" referrerpolicy="no-referrer" :src="generateDocumentLink(DEMO_WORD_SRC)"></iframe>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 1500px;
}
</style>
