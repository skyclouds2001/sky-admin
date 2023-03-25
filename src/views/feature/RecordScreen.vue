<script setup lang="ts">
import { onMounted } from 'vue'
import { ElButton, ElSpace } from 'element-plus'

/**
 * 执行截图操作
 */
const handleScreenshot = () => {
  //
}

/**
 * 启动视频流
 */
const handleOpen = () => {
  //
}

/**
 * 关闭视频流
 */
const handleClose = () => {
  //
}

onMounted(() => {
  //
})
</script>

<template>
  <el-space size="large" class="w-full p-5">
    <el-space size="large" direction="vertical">
      <el-button type="primary" @click="handleScreenshot">截图</el-button>
      <el-button type="primary" @click="handleOpen">开启</el-button>
      <el-button type="primary" @click="handleClose">关闭</el-button>
    </el-space>
    <video id="video" width="800" height="600" autoplay playsinline />
  </el-space>
</template>

<style scoped lang="scss">
#video {
  background-color: black;
}
</style>
