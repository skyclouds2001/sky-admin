<script setup lang="ts">
import { ElSpace } from 'element-plus'
import EncoderDecoder from '@/components/feature/EncoderDecoder.vue'
import HashAlgorithm from '@/components/feature/HashAlgorithm.vue'
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4">
    <encoder-decoder />
    <hash-algorithm />
  </el-space>
</template>

<style scoped lang="scss"></style>
