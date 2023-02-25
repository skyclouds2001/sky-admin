<script setup lang="ts">
import { ElContainer, ElAside, ElHeader, ElMain, ElFooter, ElBacktop } from 'element-plus'
import { useMenuStore } from '@/store'
import PageSidebar from './PageSidebar.vue'
import PageHeader from './PageHeader.vue'
import PageFooter from './PageFooter.vue'
import PageTabs from './PageTabs.vue'

const menuStore = useMenuStore()
</script>

<template>
  <el-container class="main-container w-screen h-screen">
    <el-aside class="w-auto h-screen">
      <page-sidebar />
    </el-aside>
    <el-container class="page-container h-screen" :style="{ width: menuStore.isCollapse ? 'calc(100vw - 4rem)' : 'calc(100vw - 18rem)' }">
      <el-header class="border-b">
        <page-header />
      </el-header>
      <el-main class="content-container p-0">
        <page-tabs>
          <slot />
        </page-tabs>
      </el-main>
      <el-footer class="border-t">
        <page-footer />
      </el-footer>
    </el-container>
  </el-container>

  <el-backtop />
</template>

<style scoped lang="scss">
.main-container {
  .page-container {
    .content-container {
      width: 100%;
      height: calc(100vh - 60px * 2);
    }
  }
}
</style>
