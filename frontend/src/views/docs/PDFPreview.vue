<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as pdfjs from 'pdfjs-dist'
import worker from 'pdfjs-dist/build/pdf.worker.min?url'
import { DEMO_PDF_SRC } from '@/config'

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  pdfjs.GlobalWorkerOptions.workerSrc = worker

  const doc = await pdfjs.getDocument(new URL(DEMO_PDF_SRC, import.meta.url)).promise

  const page = await doc.getPage(1)

  const cvs = canvas.value as HTMLCanvasElement
  const ctx = cvs.getContext('2d') as CanvasRenderingContext2D

  const scale = window.devicePixelRatio ?? 1

  const viewport = page.getViewport()

  cvs.width = Math.floor(scale * viewport.width)
  cvs.height = Math.floor(scale * viewport.height)
  cvs.style.width = Math.floor(viewport.width) + 'px'
  cvs.style.height = Math.floor(viewport.height) + 'px'

  page.render({
    canvasContext: ctx,
    viewport,
    transform: [scale, 0, 0, scale, 0, 0],
  })
})
</script>

<template>
  <canvas ref="canvas" class="pdf-preview"></canvas>
</template>

<style scoped lang="scss">
.pdf-preview {
  width: 100%;
  height: 100%;
}
</style>
