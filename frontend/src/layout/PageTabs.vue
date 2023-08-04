<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElTabs, ElTabPane, ElScrollbar } from 'element-plus'
import { INDEX_ROUTE } from '@/config'
import { useTabsStore } from '@/store'

const router = useRouter()

const i18n = useI18n()

const store = useTabsStore()

const currentPath = computed(() => store.currentTab)

/**
 * 切换 Tab 方法
 * @param path - 待切换 tab 对应页面路径
 */
const switchTab: InstanceType<typeof ElTabs>['onTabChange'] = (path) => {
  void router.push(path as string)
}

/**
 * 移除 Tab 方法
 * @param path - 该 tab 对应页面路径
 */
const removeTab: InstanceType<typeof ElTabs>['onTabRemove'] = (path) => {
  const index = store.tabs.findIndex((v) => v.path === path)
  store.tabs.splice(index, 1)
  if (store.currentTab === path) {
    store.currentTab = store.tabs.at(index < store.tabs.length ? index : -1)?.path as string
  }
}
</script>

<template>
  <el-tabs v-model="currentPath" class="tabs" type="border-card" @tab-change="switchTab" @tab-remove="removeTab">
    <el-tab-pane v-for="item in store.tabs" :key="item.path" class="tab" :label="i18n.t(`router.${item.path}`)" :name="item.path" lazy :closable="item.path !== INDEX_ROUTE">
      <template v-if="item.path === currentPath">
        <el-scrollbar wrap-class="wrap" view-class="view flex justify-center items-center">
          <slot />
        </el-scrollbar>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.tabs {
  @apply w-full h-full;
  @apply border-0;
  @apply select-none;

  .tab {
    @apply select-text;

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
