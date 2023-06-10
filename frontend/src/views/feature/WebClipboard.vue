<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElButton, ElCard, ElInput, ElMessage, ElSpace, ElText } from 'element-plus'
import { useClipboard } from '@/hook'

const { isSupported, isCopied, copy } = useClipboard()

const text = ref('')

watch(isCopied, (cur, pre) => {
  if (cur && !pre) {
    ElMessage({
      message: '已复制',
      type: 'success',
      showClose: true,
      center: true,
    })
  }
})
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <div class="pb-4">
        <el-text v-if="!isSupported" size="small">当前浏览器不支持 Vibrate API</el-text>
      </div>
      <div class="pb-4">
        <el-input v-model="text" name="text" clearable />
      </div>
      <el-button type="primary" :disabled="!isSupported" @click="copy(text)">复制</el-button>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
