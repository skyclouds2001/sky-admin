<script setup lang="ts">
import { DEMO_EXCEL_SRC } from '@/config'
import { generateDocumentLink } from '@/util'
</script>

<template>
  <iframe class="excel-preview" name="excel-preview" title="excel-preview" referrerpolicy="no-referrer" :src="generateDocumentLink(DEMO_EXCEL_SRC)"></iframe>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 1500px;
}
</style>
