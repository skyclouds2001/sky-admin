<script setup lang="ts">
import { ElSpace } from 'element-plus'
import Base64Encoder from '@/components/feature/Base64Encoder.vue'
import Latin1Encoder from '@/components/feature/Latin1Encoder.vue'
import HexEncoder from '@/components/feature/HexEncoder.vue'
import Utf8Encoder from '@/components/feature/Utf8Encoder.vue'
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4">
    <base64-encoder />
    <latin1-encoder />
    <hex-encoder />
    <utf8-encoder />
  </el-space>
</template>

<style scoped lang="scss"></style>
