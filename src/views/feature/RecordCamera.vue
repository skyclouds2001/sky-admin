<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElButton, ElSelect, ElSpace, ElOption } from 'element-plus'
import { initCameraStream, initDevices, captureScreenshot } from '@/util'

const i18n = useI18n()

onMounted(() => {
  initDevices((data) => {
    devices.value = data
  })
})

const el = ref<HTMLVideoElement | null>(null)

/**
 * 当前设备
 */
const device = ref<string>()

/**
 * 设备列表
 */
const devices = ref<MediaDeviceInfo[]>([])

/**
 * 执行截图操作
 */
const handleScreenshot = () => {
  captureScreenshot(el.value as HTMLVideoElement)
}

/**
 * 启动视频流
 */
const handleOpen = () => {
  initCameraStream(el.value as HTMLVideoElement, device.value)
}

/**
 * 关闭视频流
 */
const handleClose = () => {
  ;(el.value as HTMLVideoElement).srcObject = null
  device.value = undefined
}
</script>

<template>
  <el-space size="large" class="w-full p-5">
    <el-space size="large" direction="vertical">
      <el-select v-model="device" name="device">
        <el-option v-for="item in devices" :key="item.deviceId" :label="item.label" :value="item.deviceId" />
      </el-select>
      <el-button type="primary" @click="handleScreenshot">{{ i18n.t('feature.screenshot') }}</el-button>
      <el-button type="primary" @click="handleOpen">{{ i18n.t('feature.open') }}</el-button>
      <el-button type="primary" @click="handleClose">{{ i18n.t('feature.close') }}</el-button>
    </el-space>
    <video id="video" ref="el" width="800" height="600" autoplay playsinline />
  </el-space>
</template>

<style scoped lang="scss">
#video {
  background-color: black;
}
</style>
