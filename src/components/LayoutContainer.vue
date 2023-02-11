<script setup lang="ts">
import { ElContainer, ElAside, ElHeader, ElMain, ElFooter } from 'element-plus'
import PageSidebar from '@/components/PageSidebar.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
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
      <el-main>
        <slot></slot>
      </el-main>
      <el-footer>
        <page-footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.page-container {
  @apply w-screen min-h-screen;
}
</style>
