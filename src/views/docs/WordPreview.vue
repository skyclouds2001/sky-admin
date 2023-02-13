<script setup lang="ts">
import { DEMO_WORD_SRC } from '@/config'

const PREVIEW_WORD_SRC = `https://view.officeapps.live.com/op/view.aspx?src=${DEMO_WORD_SRC}`
</script>

<template>
  <iframe class="word-preview" name="word-preview" title="word-preview" referrerpolicy="no-referrer" :src="PREVIEW_WORD_SRC"></iframe>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 1500px;
}
</style>
