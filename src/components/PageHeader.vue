<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { usePagesStore } from '@/store'

const store = usePagesStore()
</script>

<template>
  <div class="page-header">
    <div>
      <el-breadcrumb>
        <el-breadcrumb-item v-for="item in store.pages" :key="item.name" :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>right</div>
  </div>
</template>

<style scoped lang="scss">
.page-header {
  @apply flex justify-between items-center;

  height: 100%;
}
</style>
