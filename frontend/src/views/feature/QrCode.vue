<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard } from 'element-plus'
import QrCode from 'qrcode'

const simple = ref<HTMLCanvasElement | null>(null)

const image = ref<HTMLImageElement | null>(null)

const size = ref<HTMLCanvasElement | null>(null)

const style = ref<HTMLCanvasElement | null>(null)

const i18n = useI18n()

onMounted(() => {
  if (simple.value === null || size.value === null || style.value === null) return

  QrCode.toDataURL('0123456789', {}, (error, url) => {
    if (error instanceof Error && image.value !== null) {
      image.value.src = url
    }
  })

  void QrCode.toCanvas(simple.value, '0123456789')

  void QrCode.toCanvas(size.value, '0123456789', {
    width: 200,
  })

  void QrCode.toCanvas(style.value, '0123456789', {
    color: {
      dark: '#0000ffff',
      light: '#ff00ff55',
    },
  })
})
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">{{ i18n.t('feature.qrcode.base') }}</div>
      </template>
      <canvas ref="simple"></canvas>
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">{{ i18n.t('feature.qrcode.image') }}</div>
      </template>
      <img ref="image" src="" alt="" />
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">{{ i18n.t('feature.qrcode.size') }}</div>
      </template>
      <canvas ref="size"></canvas>
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">{{ i18n.t('feature.qrcode.style') }}</div>
      </template>
      <canvas ref="style"></canvas>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
