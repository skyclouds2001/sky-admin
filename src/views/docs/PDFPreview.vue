<script setup lang="ts">
import { ElSpace } from 'element-plus'
import { DEMO_PDF_SRC } from '@/config'
</script>

<template>
  <el-space direction="vertical" alignment="flex-start">
    <div class="overflow-hidden">
      <div class="text-xl font-bold py-4">原生 iframe 方案</div>
      <iframe class="pdf-preview" name="pdf-preview" title="pdf-preview" referrerpolicy="no-referrer" :src="DEMO_PDF_SRC"></iframe>
    </div>
  </el-space>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 1200px;
}
</style>
