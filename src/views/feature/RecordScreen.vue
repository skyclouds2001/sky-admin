<script setup lang="ts">
import { ref, shallowRef, triggerRef } from 'vue'
import { ElButton, ElSelect, ElSpace, ElOption } from 'element-plus'
import { initScreenStream, getSupportedMimeTypes, captureScreenshot, initVideoRecorderStream } from '@/util'

const mediaRecorder = shallowRef<MediaRecorder | null>(null)

const el = ref<HTMLVideoElement | null>(null)

/**
 * 当前使用的 MIME TYPE
 */
const mimeType = ref<string>()

/**
 * 支持的 MIME TYPE 列表
 */
const mimeTypes = ref(getSupportedMimeTypes())

/**
 * 执行截图操作
 */
const handleScreenshot = () => {
  captureScreenshot(el.value as HTMLVideoElement)
}

/**
 * 开始录制
 */
const handleStartRecode = async () => {
  await initScreenStream(el.value as HTMLVideoElement)

  mediaRecorder.value = initVideoRecorderStream(el.value as HTMLVideoElement, mimeType.value)

  mediaRecorder.value?.start()
  triggerRef(mediaRecorder)
}

/**
 * 暂停录制
 */
const handleParseRecord = () => {
  mediaRecorder.value?.pause()
  triggerRef(mediaRecorder)
}

/**
 * 继续录制
 */
const handleResumeRecord = () => {
  mediaRecorder.value?.resume()
  triggerRef(mediaRecorder)
}

/**
 * 结束录制
 */
const handleEndRecord = () => {
  mediaRecorder.value?.stop()
  mediaRecorder.value = null
}

/**
 * 启动视频流
 */
const handleOpen = () => {
  initScreenStream(el.value as HTMLVideoElement)
}

/**
 * 关闭视频流
 */
const handleClose = () => {
  ;(el.value as HTMLVideoElement).srcObject = null
}
</script>

<template>
  <el-space size="large" class="w-full p-5">
    <el-space size="large" direction="vertical">
      <el-button type="primary" @click="handleScreenshot">截图</el-button>
      <el-select v-model="mimeType" name="device">
        <el-option v-for="item in mimeTypes" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button :disabled="mediaRecorder !== null" type="primary" @click="handleStartRecode">开始录制</el-button>
      <el-button :disabled="mediaRecorder === null || mediaRecorder.state === 'paused'" type="primary" @click="handleParseRecord">暂停录制</el-button>
      <el-button :disabled="mediaRecorder === null || mediaRecorder.state === 'recording'" type="primary" @click="handleResumeRecord">继续录制</el-button>
      <el-button :disabled="mediaRecorder === null" type="primary" @click="handleEndRecord">结束录制</el-button>
      <el-button type="primary" @click="handleOpen">开启</el-button>
      <el-button type="primary" @click="handleClose">关闭</el-button>
    </el-space>
    <video id="video" ref="el" width="800" height="600" autoplay playsinline />
  </el-space>
</template>

<style scoped lang="scss">
#video {
  background-color: black;
}
</style>
