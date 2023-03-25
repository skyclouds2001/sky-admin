<script setup lang="ts">
import { ref, shallowRef, triggerRef, onMounted } from 'vue'
import { ElButton, ElMessage, ElSelect, ElSpace, ElOption } from 'element-plus'
import { initScreenStream, getSupportedMimeTypes, captureScreenshot } from '@/util'

const mediaRecorder = shallowRef<MediaRecorder | null>(null)

const el = ref<HTMLVideoElement | null>(null)

/**
 * 当前使用的 MIME TYPE
 */
const mimeType = ref('')
/**
 * 支持的 MIME TYPE 列表
 */
const mimeTypes = ref(getSupportedMimeTypes())

/**
 * 执行截图操作
 */
const handleScreenshot = () => {
  captureScreenshot(document.getElementById('video') as HTMLVideoElement)
}

/**
 * 开始录制
 */
const handleStartRecode = () => {
  const stream = el.value?.captureStream()
  mediaRecorder.value = new MediaRecorder(stream, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: mimeType.value,
  })

  mediaRecorder.value?.addEventListener('dataavailable', (e) => {
    const blob = new Blob([e.data], { type: 'video/mp4' })
    const link = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = link
    a.download = '录制'
    a.target = '_blank'
    a.hidden = true
    a.style.display = 'none'
    a.click()
  })

  mediaRecorder.value?.addEventListener('error', () => {
    ElMessage.error({
      message: '录屏失败',
    })
  })

  mediaRecorder.value?.start()
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
  const video = el.value as HTMLVideoElement
  video.srcObject = null
}

onMounted(() => {
  initScreenStream(el.value as HTMLVideoElement)
})
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
