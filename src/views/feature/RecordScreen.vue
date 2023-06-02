<script setup lang="ts">
import { ref, shallowRef, triggerRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElButton, ElSelect, ElSpace, ElOption } from 'element-plus'
import { useDisplayMedia } from '@/hook'
import { getSupportedMimeTypes, captureScreenshot, initVideoRecorderStream } from '@/util'

const i18n = useI18n()

const { isEnabled, stream, start, stop } = useDisplayMedia()

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
  // @ts-expect-error captureStream method has not apply on typescript dom definition file
  const stream = el.value.captureStream() as MediaStream

  mediaRecorder.value = initVideoRecorderStream(stream, mimeType.value)

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
const handleOpen = async () => {
  await start()
  if (el.value !== null) el.value.srcObject = stream.value
}

/**
 * 关闭视频流
 */
const handleClose = async () => {
  await stop()
  if (el.value !== null) el.value.srcObject = null
}
</script>

<template>
  <el-space size="large" class="w-full p-5">
    <el-space size="large" direction="vertical">
      <el-button :disabled="isEnabled" type="primary" @click="handleOpen">{{ i18n.t('feature.open') }}</el-button>
      <el-button :disabled="!isEnabled" type="primary" @click="handleClose">{{ i18n.t('feature.close') }}</el-button>
      <el-button :disabled="!isEnabled || mediaRecorder !== null" type="primary" @click="handleStartRecode">{{ i18n.t('feature.open_record') }}</el-button>
      <el-button :disabled="!isEnabled || mediaRecorder === null || mediaRecorder.state === 'paused'" type="primary" @click="handleParseRecord">{{ i18n.t('feature.pause_record') }}</el-button>
      <el-button :disabled="!isEnabled || mediaRecorder === null || mediaRecorder.state === 'recording'" type="primary" @click="handleResumeRecord">{{ i18n.t('feature.resume_record') }}</el-button>
      <el-button :disabled="!isEnabled || mediaRecorder === null" type="primary" @click="handleEndRecord">{{ i18n.t('feature.stop_record') }}</el-button>
      <el-select v-model="mimeType" name="device">
        <el-option v-for="item in mimeTypes" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button :disabled="!isEnabled" type="primary" @click="handleScreenshot">{{ i18n.t('feature.screenshot') }}</el-button>
    </el-space>
    <video id="video" ref="el" width="800" height="600" autoplay playsinline></video>
  </el-space>
</template>

<style scoped lang="scss">
#video {
  background-color: black;
}
</style>
