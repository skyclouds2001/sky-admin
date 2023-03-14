<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { locale } from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import LayoutContainer from '@/layout/LayoutContainer.vue'

const i18n = useI18n()

locale(i18n.locale.value === 'zh-CN' ? 'zh-cn' : 'en')
</script>

<template>
  <el-config-provider :locale="i18n.locale.value === 'zh-CN' ? zhCn : en">
    <layout-container>
      <router-view />
    </layout-container>
  </el-config-provider>
</template>

<style scoped></style>
