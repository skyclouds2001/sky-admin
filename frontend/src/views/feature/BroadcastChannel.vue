<script setup lang="ts">
import { getCurrentInstance, ref, watch } from 'vue'
import { ElButton, ElCard, ElInput, ElMessage, ElSpace, ElText } from 'element-plus'
import { useBroadcastChannel } from '@skyclouds2001/vhooks'

const appContext = getCurrentInstance()?.appContext

const message = ref('')

const { isSupported, data, error, post } = useBroadcastChannel<string>('broadcast-channel-demo')

watch([data, error], ([data, error]) => {
  if (data !== null) {
    ElMessage.info(
      {
        message: `New Message: ${data}`,
        showClose: true,
        center: true,
        grouping: true,
      },
      appContext
    )
  }
  if (error !== null) {
    ElMessage.error(
      {
        message: `Message Error: ${error.data}`,
        showClose: true,
        center: true,
        grouping: true,
      },
      appContext
    )
  }
})
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <div class="pb-4">
        <el-text v-if="!isSupported" size="small">当前浏览器不支持 BroadcastChannel API</el-text>
      </div>
      <div class="pb-4">
        <el-input v-model="message" name="broadcast-channel" clearable />
      </div>
      <el-button type="primary" :disabled="!isSupported" @click="post(message)">发送信息</el-button>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
