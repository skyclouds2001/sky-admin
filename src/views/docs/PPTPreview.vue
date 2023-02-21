<script setup lang="ts">
import { DEMO_PPT_SRC } from '@/config'

const PREVIEW_PPT_SRC = `https://view.officeapps.live.com/op/view.aspx?src=${DEMO_PPT_SRC}`
</script>

<template>
  <iframe class="ppt-preview" name="ppt-preview" title="ppt-preview" referrerpolicy="no-referrer" :src="PREVIEW_PPT_SRC"></iframe>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 1500px;
}
</style>
