<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElTabs, ElTabPane, ElScrollbar } from 'element-plus'
import { useTabsStore } from '@/store'

const route = useRoute()

const router = useRouter()

const i18n = useI18n()

const store = useTabsStore()

/**
 * 切换 Tab 方法
 * @param path - 待切换 tab 对应页面路径
 */
const switchTab = (path: string) => {
  router.push(path)
}

/**
 * 移除 Tab 方法
 * @param path - 该 tab 对应页面路径
 */
const removeTab = (path: string) => {
  const index = store.tabs.findIndex((v) => v.path === path)
  store.tabs.splice(index, 1)
  if (store.currentTab === path) {
    store.currentTab = store.tabs.at(index < store.tabs.length ? index : -1)?.path ?? 'Unknown'
  }
}

onBeforeMount(() => {
  store.currentTab = route.path
})
</script>

<template>
  <el-tabs v-model="store.currentTab" class="tabs" type="border-card" @tab-change="switchTab" @tab-remove="removeTab">
    <el-tab-pane v-for="item in store.tabs" :key="item.path" class="tab" :label="i18n.t(`router.${item.path}`)" :name="item.path" lazy :closable="item.path !== '/'">
      <el-scrollbar wrap-class="wrap" view-class="view flex justify-center items-center">
        <slot v-if="item.path === store.currentTab" />
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.tabs {
  @apply w-full h-full;
  @apply border-0;
  @apply select-none;

  .tab {
    width: 100%;
    height: calc(100vh - 60px * 2 - 40px);
  }
}
</style>

<style>
div:has(.tab) {
  padding: 0 !important;
}
</style>
