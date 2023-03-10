<script setup lang="ts">
import { ElSpace } from 'element-plus'
import Base64Encoder from '@/components/feature/Base64Encoder.vue'
import HexEncoder from '@/components/feature/HexEncoder.vue'
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4">
    <base64-encoder />
    <hex-encoder />
  </el-space>
</template>

<style scoped lang="scss"></style>
