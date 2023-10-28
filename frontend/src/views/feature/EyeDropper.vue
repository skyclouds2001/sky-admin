<script setup lang="ts">
import { useEyeDropper } from '@sky-fly/sky-hooks'
import { ElButton, ElCard, ElSpace, ElText } from 'element-plus'

const { isSupported, color, open } = useEyeDropper()
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <div class="pb-4">
        <el-text v-if="!isSupported" size="small">当前浏览器不支持 EyeDropper API</el-text>
      </div>
      <div class="pb-4">
        <div class="w-5 h-5 border" :style="`background-color: ${color}`"></div>
      </div>
      <el-button type="primary" :disabled="!isSupported" @click="open()">打开吸管工具</el-button>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
