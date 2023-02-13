<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { ElSpace } from 'element-plus'
import { DEMO_PDF_SRC } from '@/config'
import { renderPDF } from '@/util/pdf-preview'

onBeforeMount(() => {
  renderPDF(DEMO_PDF_SRC, document.getElementById('pdf-preview') as HTMLCanvasElement)
})
</script>

<template>
  <el-space direction="vertical" alignment="flex-start">
    <div class="overflow-hidden">
      <div class="text-xl font-bold py-4">原生 iframe 方案</div>
      <iframe class="pdf-preview" name="pdf-preview" title="pdf-preview" referrerpolicy="no-referrer" :src="DEMO_PDF_SRC"></iframe>
    </div>
    <!--
    <div class="overflow-hidden">
      <div class="text-xl font-bold py-4">pdf.js 方案</div>
      <canvas id="pdf-preview"></canvas>
    </div>
    -->
  </el-space>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 1200px;
}
</style>
