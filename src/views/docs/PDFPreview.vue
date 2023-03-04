<script setup lang="ts">
import { DEMO_PDF_SRC } from '@/config'
</script>

<template>
  <iframe class="pdf-preview" name="pdf-preview" title="pdf-preview" referrerpolicy="no-referrer" :src="DEMO_PDF_SRC"></iframe>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 1200px;
}
</style>
