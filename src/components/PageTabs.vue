<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElTabs, ElTabPane } from 'element-plus'
import { useTabsStore } from '@/store'

const route = useRoute()

const router = useRouter()

const store = useTabsStore()

/**
 * 切换 Tab 方法
 *
 * @param path - 待切换 tab 对应页面路径
 */
const switchTab = (path: string) => {
  router.push(path)
}

/**
 * 移除 Tab 方法
 *
 * @param path - 该 tab 对应页面路径
 */
const removeTab = (path: string) => {
  const index = store.tabs.findIndex((v) => v.path === path)
  store.tabs.splice(index, 1)
  if (store.currentTab === path) {
    store.currentTab = store.tabs[0].path
  }
}

onBeforeMount(() => {
  store.currentTab = route.path
})
</script>

<template>
  <el-tabs v-model="store.currentTab" type="border-card" class="tabs" @tab-change="switchTab" @tab-remove="removeTab">
    <el-tab-pane v-for="item in store.tabs" :key="item.path" :label="item.name" :name="item.path" lazy :closable="item.path !== '/'">
      <slot />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.tabs {
  @apply w-full h-full;
}
</style>
