<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ElButton, ElSelect, ElSpace, ElOption } from 'element-plus'
import { initStream, initDevices, captureScreenshot } from '@/util'

/**
 * 当前设备
 */
const device = ref('')
/**
 * 设备列表
 */
const devices = ref<MediaDeviceInfo[]>([])

watch(device, (current) => {
  if (current !== '') {
    initStream(document.getElementById('video') as HTMLVideoElement, current)
  } else {
    const el = document.getElementById('video') as HTMLVideoElement
    el.srcObject = null
  }
})

/**
 * 执行截图操作
 */
const handleScreenshot = () => {
  captureScreenshot(document.getElementById('video') as HTMLVideoElement)
}

/**
 * 启动视频流
 */
const handleOpen = () => {
  device.value = devices.value[0].deviceId
}

/**
 * 关闭视频流
 */
const handleClose = () => {
  device.value = ''
}

onMounted(() => {
  initDevices((data) => {
    devices.value = data
    device.value = data[0].deviceId
  })
})
</script>

<template>
  <el-space size="large" class="w-full p-5">
    <el-space size="large" direction="vertical">
      <el-select v-model="device" name="device">
        <el-option v-for="item in devices" :key="item.deviceId" :label="item.label" :value="item.deviceId" />
      </el-select>
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
