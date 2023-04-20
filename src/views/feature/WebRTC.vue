<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElSpace } from 'element-plus'

const i18n = useI18n()

const pc = new RTCPeerConnection()

/**
 * 初始化
 */
const handleInitWebRTC = async () => {
  const local = document.getElementById('local') as HTMLVideoElement
  const remote = document.getElementById('remote') as HTMLVideoElement

  const remoteStream = new MediaStream()

  pc.addEventListener('track', (e) => {
    e.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track)
    })
    remote.srcObject = remoteStream
  })

  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })

  local.srcObject = localStream

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream)
  })
}

const offerSdp = ref('')
const answerSdp = ref('')

const createOffer = async () => {
  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)

  pc.addEventListener('icecandidate', (e) => {
    if (e.candidate) {
      offerSdp.value = JSON.stringify(pc.localDescription)
    }
  })
}

const createAnswer = async () => {
  const offer = JSON.parse(offerSdp.value)

  pc.addEventListener('icecandidate', (e) => {
    if (e.candidate) {
      answerSdp.value = JSON.stringify(pc.localDescription)
    }
  })

  await pc.setRemoteDescription(offer)

  const answer = await pc.createAnswer()
  await pc.setLocalDescription(answer)
}

const addAnswer = () => {
  const answer = JSON.parse(answerSdp.value)
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(answer)
  }
}
</script>

<template>
  <el-space size="large" class="w-full p-5">
    <el-space size="large" direction="vertical">
      <video id="local" ref="el" width="800" height="600" autoplay playsinline muted />
      <video id="remote" ref="el" width="800" height="600" autoplay playsinline muted />
    </el-space>
    <el-space size="large" direction="vertical">
      <el-button type="primary" @click="handleInitWebRTC">{{ i18n.t('feature.initialization') }}</el-button>
      <el-card header="用户A">
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="createOffer">{{ i18n.t('feature.create_offer') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="offerSdp" />
          </el-form-item>
        </el-form>
      </el-card>
      <el-card header="用户B">
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="createAnswer">{{ i18n.t('feature.create_answer') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="answerSdp" />
          </el-form-item>
        </el-form>
      </el-card>
      <el-card header="用户A">
        <el-form-item>
          <el-button type="primary" @click="addAnswer">{{ i18n.t('feature.add_answer') }}</el-button>
        </el-form-item>
      </el-card>
    </el-space>
  </el-space>
</template>

<style scoped></style>
