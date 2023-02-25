<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { locale } from 'dayjs'
import 'dayjs/locale/zh-cn'
import LayoutContainer from '@/layout/LayoutContainer.vue'

locale('zh-cn')
</script>

<template>
  <el-config-provider :locale="zhCn">
    <layout-container>
      <router-view />
    </layout-container>
  </el-config-provider>
</template>

<style scoped></style>
