<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ElConfigProvider } from 'element-plus'
// @ts-expect-error no definition file existed
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// @ts-expect-error no definition file existed
import en from 'element-plus/dist/locale/en.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import { useLang } from '@/hook'

const i18n = useI18n()

useLang()
</script>

<template>
  <el-config-provider :locale="i18n.locale.value === 'zh-CN' ? zhCn : en" :button="{ autoInsertSpace: true }" :message="{ max: 5 }">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition mode="out-in">
          <keep-alive>
            <suspense>
              <component :is="Component" />
            </suspense>
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </el-config-provider>
</template>

<style scoped></style>
