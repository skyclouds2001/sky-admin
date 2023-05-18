<script setup lang="ts">
import { ElButton, ElCard, ElSpace, ElText } from 'element-plus'
import { useVibrate } from '@/hook'

const { isSupported, stop, vibrate } = useVibrate(1000)
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <div class="pb-4">
        <el-text v-if="!isSupported" size="small">当前浏览器不支持 Vibrate API</el-text>
      </div>
      <el-button type="primary" :disabled="!isSupported" @click="vibrate()">开始振动</el-button>
      <el-button type="primary" :disabled="!isSupported" @click="stop()">停止振动</el-button>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
