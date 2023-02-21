<script setup lang="ts">
import { DEMO_EXCEL_SRC } from '@/config'

const PREVIEW_EXCEL_SRC = `https://view.officeapps.live.com/op/view.aspx?src=${DEMO_EXCEL_SRC}`
</script>

<template>
  <iframe class="excel-preview" name="excel-preview" title="excel-preview" referrerpolicy="no-referrer" :src="PREVIEW_EXCEL_SRC"></iframe>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 1500px;
}
</style>
