<script setup lang="ts">
/* eslint-disable import/no-named-as-default-member */

import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard } from 'element-plus'
import QrCode from 'qrcode'

const i18n = useI18n()

onMounted(() => {
  QrCode.toCanvas(document.getElementById('simple-qrcode'), '0123456789')
  QrCode.toDataURL('0123456789', {}, (error, url) => {
    if (!error) {
      ;(document.getElementById('img-qrcode') as HTMLImageElement).src = url
    }
  })
  QrCode.toCanvas(document.getElementById('qrcode-size'), '0123456789', {
    width: 200,
  })
  QrCode.toCanvas(document.getElementById('qrcode-style'), '0123456789', {
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
      <canvas id="simple-qrcode"></canvas>
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">{{ i18n.t('feature.qrcode.image') }}</div>
      </template>
      <img id="img-qrcode" src="" alt="" />
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">{{ i18n.t('feature.qrcode.size') }}</div>
      </template>
      <canvas id="qrcode-size"></canvas>
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">{{ i18n.t('feature.qrcode.style') }}</div>
      </template>
      <canvas id="qrcode-style"></canvas>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
