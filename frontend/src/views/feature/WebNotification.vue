<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElCard, ElInput, ElSpace, ElText } from 'element-plus'
import { useNotification } from '@sky-fly/vhooks'

const title = ref('')

const { isSupported, show, close } = useNotification(title.value)
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <div class="pb-4">
        <el-text v-if="!isSupported" size="small">当前浏览器不支持 Notification API</el-text>
      </div>
      <div class="pb-4">
        <el-input v-model="title" name="notification" clearable />
      </div>
      <el-button type="primary" :disabled="!isSupported" @click="show()">发送通知</el-button>
      <el-button type="primary" :disabled="!isSupported" @click="close()">关闭通知</el-button>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
