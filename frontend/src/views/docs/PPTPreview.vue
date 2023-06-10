<script setup lang="ts">
import { DEMO_PPT_SRC } from '@/config'
import { generateDocumentLink } from '@/util'
</script>

<template>
  <iframe class="ppt-preview" name="ppt-preview" title="ppt-preview" referrerpolicy="no-referrer" :src="generateDocumentLink(DEMO_PPT_SRC)"></iframe>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 1500px;
}
</style>
