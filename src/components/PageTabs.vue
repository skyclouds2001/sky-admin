<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { useTabsStore } from '@/store'

const store = useTabsStore()

const currentTab = ref('/home')

onBeforeMount(() => {
  store.$subscribe((mutation, state) => {
    currentTab.value = state.currentTab
  })
})
</script>

<template>
  <el-tabs v-model="currentTab" type="border-card" class="tabs">
    <el-tab-pane v-for="item in store.tabs" :key="item.name" :label="item.name" :name="item.path" lazy :closable="item.path !== '/home'">
      <slot />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.tabs {
  @apply w-full h-full;
}
</style>
