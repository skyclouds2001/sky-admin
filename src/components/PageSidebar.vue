<script setup lang="ts">
import { ref } from 'vue'
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { HomeFilled, InfoFilled, Fold, Expand } from '@element-plus/icons-vue'

/**
 * 控制 Sidebar 伸缩状态
 */
const isCollapse = ref(false)

/**
 * 切换 Sidebar 伸缩状态方法
 */
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <el-menu router default-active="/" :collapse="isCollapse" :class="['page-sidebar', isCollapse ? 'w-16' : 'w-[18rem]']">
    <el-menu-item index="/">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <el-icon><InfoFilled /></el-icon>
      <span>关于</span>
    </el-menu-item>
    <div class="collapse-controller" @click="handleCollapse">
      <el-icon v-if="isCollapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
  </el-menu>
</template>

<style scoped lang="scss">
.page-sidebar {
  --el-menu-bg-color: #001529 !important;
  --el-menu-hover-bg-color: #001529 !important;
  --el-menu-text-color: #a5acb3 !important;
  --el-menu-active-color: #fff !important;

  @apply h-full;
  @apply relative;

  .el-menu-item.is-active {
    background-color: #4091f7 !important;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    color: #f2f3f4 !important;
  }

  .collapse-controller {
    @apply absolute bottom-0 left-0;
    @apply w-full h-8 px-5;
    @apply text-left leading-8 text-xl;

    color: #409eff;
  }
}
</style>
