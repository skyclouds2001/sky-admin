<script setup lang="ts">
import { ElCard, ElSpace } from 'element-plus'
import { useWebVitals } from '@/hook'

const { LCPs, FIDs, CLSs } = useWebVitals()
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always" header="LCP">{{ LCPs }}</el-card>
    <el-card shadow="always" header="FID">{{ FIDs }}</el-card>
    <el-card shadow="always" header="CLS">{{ CLSs }}</el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
