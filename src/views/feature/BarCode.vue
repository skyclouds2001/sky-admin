<script setup lang="ts">
import { onMounted } from 'vue'
import { ElSpace, ElCard } from 'element-plus'
import JsBarcode from 'jsbarcode'

onMounted(() => {
  JsBarcode('#simple-bar-code', '0123456789')
  JsBarcode('#colorful-bar-code', '0123456789', {
    lineColor: '#f00',
  })
  JsBarcode('#font-bar-code', '0123456789', {
    font: 'fantasy',
    fontOptions: 'bold italic',
    fontSize: 30,
  })
})
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <canvas id="simple-bar-code"></canvas>
    </el-card>
    <el-card shadow="always">
      <canvas id="colorful-bar-code"></canvas>
    </el-card>
    <el-card shadow="always">
      <canvas id="font-bar-code"></canvas>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
