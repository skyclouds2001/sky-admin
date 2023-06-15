<script setup lang="ts">
import { ElSpace } from 'element-plus'
import { EncoderDecoder, HashAlgorithm, HMACAlgorithm, PBKDF2Algorithm } from '@/components'
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4">
    <encoder-decoder />
    <hash-algorithm />
    <h-m-a-c-algorithm />
    <p-b-k-d-f2-algorithm />
  </el-space>
</template>

<style scoped lang="scss"></style>
