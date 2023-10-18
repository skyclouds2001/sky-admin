<script setup lang="ts">
import { captureScreenshot, downloadFile } from '@/util'
import { useDevicesList, useMediaRecorder, usePictureInPicture, useUserMedia } from '@sky-fly/sky-hooks'
import { ElButton, ElOption, ElSelect, ElSpace } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const el = ref<HTMLVideoElement | null>(null)

const { videoInputs: devices } = useDevicesList()

const {
  state,
  start: startRecord,
  pause: pauseRecord,
  resume: resumeRecord,
  stop: stopRecord,
} = useMediaRecorder({
  onDataAvailable(e) {
    downloadFile(new window.Blob([e.data], { type: 'video/mp4' }), '录制')
  },
})

const { toggle: togglePictureInPicture } = usePictureInPicture(el)

const { isEnabled, stream, start, stop } = useUserMedia()

/**
 * 当前设备
 */
const device = ref<string>()

/**
 * 执行截图操作
 */
const handleScreenshot = (): void => {
  captureScreenshot(el.value as HTMLVideoElement)
}

/**
 * 启动视频流
 */
const handleOpen = async (): Promise<void> => {
  await start()
  if (el.value !== null) el.value.srcObject = stream.value
}

/**
 * 关闭视频流
 */
const handleClose = async (): Promise<void> => {
  await stop()
  if (el.value !== null) el.value.srcObject = null
}
</script>

<template>
  <el-space size="large" class="w-full p-5">
    <el-space size="large" direction="vertical">
      <el-button :disabled="isEnabled" type="primary" @click="handleOpen">{{ i18n.t('feature.open') }}</el-button>
      <el-button :disabled="!isEnabled" type="primary" @click="handleClose">{{ i18n.t('feature.close') }}</el-button>
      <el-select v-model="device" name="device">
        <el-option v-for="item in devices" :key="item.deviceId" :label="item.label" :value="item.deviceId" />
      </el-select>
      <el-button :disabled="!isEnabled || state !== 'inactive'" type="primary" @click="startRecord(stream as MediaStream)">{{ i18n.t('feature.open_record') }}</el-button>
      <el-button :disabled="!isEnabled || state !== 'recording'" type="primary" @click="pauseRecord">{{ i18n.t('feature.pause_record') }}</el-button>
      <el-button :disabled="!isEnabled || state !== 'paused'" type="primary" @click="resumeRecord">{{ i18n.t('feature.resume_record') }}</el-button>
      <el-button :disabled="!isEnabled || state === 'inactive'" type="primary" @click="stopRecord">{{ i18n.t('feature.stop_record') }}</el-button>
      <el-button :disabled="!isEnabled" type="primary" @click="handleScreenshot">{{ i18n.t('feature.screenshot') }}</el-button>
      <el-button :disabled="!isEnabled" type="primary" @click="togglePictureInPicture">Picture In Picture</el-button>
    </el-space>
    <video id="video" ref="el" width="800" height="600" autoplay playsinline></video>
  </el-space>
</template>

<style scoped lang="scss">
#video {
  background-color: black;
}
</style>
