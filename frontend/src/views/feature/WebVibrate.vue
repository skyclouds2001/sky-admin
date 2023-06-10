<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElCard, ElInputNumber, ElSpace, ElText } from 'element-plus'
import { useVibrate } from '@/hook'

const pattern = ref(1000)

const { isSupported, stop, vibrate } = useVibrate(pattern)
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <div class="pb-4">
        <el-text v-if="!isSupported" size="small">当前浏览器不支持 Vibrate API</el-text>
      </div>
      <div class="pb-4">
        <el-input-number v-model="pattern" name="pattern" :min="0" :max="10000" :step="100" step-strictly />
      </div>
      <el-button type="primary" :disabled="!isSupported" @click="vibrate()">开始振动</el-button>
      <el-button type="primary" :disabled="!isSupported" @click="stop()">停止振动</el-button>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
