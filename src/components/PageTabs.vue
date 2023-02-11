<script setup lang="ts">
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { useTabsStore } from '@/store'

const store = useTabsStore()

const currentTab = ref('/home')
</script>

<template>
  <el-tabs v-model="currentTab" type="border-card" closable class="tabs">
    <el-tab-pane v-for="item in store.tabs" :key="item.name" :label="item.name" :name="item.name" lazy>
      <slot />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.tabs {
  @apply w-full h-full;
}
</style>
