<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElButton, ElSelect, ElSpace, ElOption } from 'element-plus'
import { useDevicesList, useUserMedia } from '@/hook'
import { captureScreenshot } from '@/util'

const i18n = useI18n()

const { videoInputs: devices } = useDevicesList()

const { isEnabled, stream, start, stop } = useUserMedia()

const el = ref<HTMLVideoElement | null>(null)

/**
 * 当前设备
 */
const device = ref<string>()

/**
 * 执行截图操作
 */
const handleScreenshot = () => {
  captureScreenshot(el.value as HTMLVideoElement)
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
      <el-select v-model="device" name="device">
        <el-option v-for="item in devices" :key="item.deviceId" :label="item.label" :value="item.deviceId" />
      </el-select>
      <el-button :disabled="!isEnabled" type="primary" @click="handleScreenshot">{{ i18n.t('feature.screenshot') }}</el-button>
    </el-space>
    <video id="video" ref="el" width="800" height="600" autoplay playsinline />
  </el-space>
</template>

<style scoped lang="scss">
#video {
  background-color: black;
}
</style>
