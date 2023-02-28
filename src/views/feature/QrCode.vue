<script setup lang="ts">
import { onMounted } from 'vue'
import { ElSpace, ElCard } from 'element-plus'
import QrCode from 'qrcode'

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
  <el-space size="large" alignment="start" class="w-full p-4">
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">基础二维码</div>
      </template>
      <canvas id="simple-qrcode"></canvas>
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">图片二维码</div>
      </template>
      <img id="img-qrcode" alt="" />
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">二维码大小</div>
      </template>
      <canvas id="qrcode-size"></canvas>
    </el-card>
    <el-card shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">二维码样式</div>
      </template>
      <canvas id="qrcode-style"></canvas>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
