<script setup lang="ts">
import { ElContainer, ElAside, ElHeader, ElMain, ElFooter, ElBacktop } from 'element-plus'
import PageSidebar from './PageSidebar.vue'
import PageHeader from './PageHeader.vue'
import PageFooter from './PageFooter.vue'
import PageTabs from './PageTabs.vue'
</script>

<template>
  <el-container class="page-container">
    <el-aside class="w-auto">
      <page-sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <page-header />
      </el-header>
      <el-main class="p-0">
        <page-tabs />
        <slot />
      </el-main>
      <el-footer class="border-t">
        <page-footer />
      </el-footer>
    </el-container>
  </el-container>

  <el-backtop />
</template>

<style scoped lang="scss">
.page-container {
  @apply w-screen min-h-screen;
}
</style>
