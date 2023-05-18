<script setup lang="ts">
import { ElButton, ElCard, ElSpace, ElText } from 'element-plus'
import { useNotification } from '@/hook'

const { isSupported, show, close } = useNotification('Notification')
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <div class="pb-4">
        <el-text v-if="!isSupported" size="small">当前浏览器不支持 Notification API</el-text>
      </div>
      <el-button type="primary" :disabled="!isSupported" @click="show()">发送通知</el-button>
      <el-button type="primary" :disabled="!isSupported" @click="close()">关闭通知</el-button>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
