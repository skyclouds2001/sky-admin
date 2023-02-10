<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { locale } from 'dayjs'
import 'dayjs/locale/zh-cn'
import LayoutContainer from '@/components/LayoutContainer.vue'

onBeforeMount(() => {
  locale('zh-cn')
})
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <LayoutContainer>
      <router-view></router-view>
    </LayoutContainer>
  </ElConfigProvider>
</template>

<style scoped></style>
