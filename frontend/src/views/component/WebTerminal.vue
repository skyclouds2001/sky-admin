<script setup lang="ts">
import { ElSpace, ElCard } from 'element-plus'
import { WebTerminal } from '@/components'
</script>

<template>
  <el-space direction="vertical" fill size="large" class="w-full px-10 py-4">
    <el-card shadow="always">
      <web-terminal />
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
