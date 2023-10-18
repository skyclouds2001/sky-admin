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
  height: 100%;
}
</style>
