<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<style scoped></style>
