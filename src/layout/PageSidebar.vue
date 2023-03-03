<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMenu, ElSubMenu, ElMenuItem, ElIcon, ElScrollbar } from 'element-plus'
import { HomeFilled, InfoFilled, Fold, Expand, Menu, Document, Link, Histogram, Service } from '@element-plus/icons-vue'
import { useTabsStore, useMenuStore } from '@/store'

const route = useRoute()

const i18n = useI18n()

const tabsStore = useTabsStore()

const menuStore = useMenuStore()

/**
 * 切换 Sidebar 伸缩状态方法
 */
const handleCollapse = () => {
  menuStore.isCollapse = !menuStore.isCollapse
}

/**
 * 默认选取菜单 index
 */
const defaultActive = ref(route.path)

watch(
  () => tabsStore.currentTab,
  (path) => {
    defaultActive.value = path
  }
)
</script>

<template>
  <el-scrollbar wrap-class="wrap" view-class="view">
    <el-menu router :default-active="defaultActive" :collapse="menuStore.isCollapse" :class="['page-sidebar', menuStore.isCollapse ? 'w-16' : 'w-[18rem]', 'min-h-screen', 'pb-10']">
      <!-- 首页 -->
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>{{ i18n.t('router./') }}</span>
      </el-menu-item>

      <!-- 图表 -->
      <el-sub-menu index="/chart">
        <template #title>
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router./chart') }}</span>
        </template>
        <el-menu-item index="/chart/bar">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router./chart/bar') }}</span>
        </el-menu-item>
        <el-menu-item index="/chart/line">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router./chart/line') }}</span>
        </el-menu-item>
        <el-menu-item index="/chart/pie">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router./chart/pie') }}</span>
        </el-menu-item>
        <el-menu-item index="/chart/scatter">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router./chart/scatter') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 嵌套菜单 -->
      <el-sub-menu index="/route">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>{{ i18n.t('router./route') }}</span>
        </template>
        <el-menu-item index="/route/1">
          <el-icon><Menu /></el-icon>
          <span>{{ i18n.t('router./route/1') }}</span>
        </el-menu-item>
        <el-sub-menu index="/route/2">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>{{ i18n.t('router./route/2') }}</span>
          </template>
          <el-menu-item index="/route/2/1">
            <el-icon><Menu /></el-icon>
            <span>{{ i18n.t('router./route/2/1') }}</span>
          </el-menu-item>
          <el-sub-menu index="/route/2/2">
            <template #title>
              <el-icon><Menu /></el-icon>
              <span>{{ i18n.t('router./route/2/2') }}</span>
            </template>
            <el-menu-item index="/route/2/2/1">
              <el-icon><Menu /></el-icon>
              <span>{{ i18n.t('router./route/2/2/1') }}</span>
            </el-menu-item>
            <el-menu-item index="/route/2/2/2">
              <el-icon><Menu /></el-icon>
              <span>{{ i18n.t('router./route/2/2/2') }}</span>
            </el-menu-item>
            <el-menu-item index="/route/2/2/3">
              <el-icon><Menu /></el-icon>
              <span>{{ i18n.t('router./route/2/2/3') }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/route/2/3">
            <el-icon><Menu /></el-icon>
            <span>{{ i18n.t('router./route/2/3') }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/route/3">
          <el-icon><Menu /></el-icon>
          <span>{{ i18n.t('router./route/3') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 文档 -->
      <el-sub-menu index="/docs">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router./docs') }}</span>
        </template>
        <el-menu-item index="/docs/word-preview">
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router./docs/word-preview') }}</span>
        </el-menu-item>
        <el-menu-item index="/docs/excel-preview">
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router./docs/excel-preview') }}</span>
        </el-menu-item>
        <el-menu-item index="/docs/ppt-preview">
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router./docs/ppt-preview') }}</span>
        </el-menu-item>
        <el-menu-item index="/docs/pdf-preview">
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router./docs/pdf-preview') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 功能 -->
      <el-sub-menu index="/feature">
        <template #title>
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router./feature') }}</span>
        </template>
        <el-menu-item index="/feature/bar-code">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router./feature/bar-code') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/qrcode">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router./feature/qrcode') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/image-editor">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router./feature/image-editor') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 外链 -->
      <el-sub-menu index="/link">
        <template #title>
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router./link') }}</span>
        </template>
        <el-menu-item index="https://github.com/skyclouds2001/SkyAdmin">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router./link/github') }}</span>
        </el-menu-item>
        <el-menu-item index="https://juejin.cn/user/814058986548567">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router./link/juejin') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 关于 -->
      <el-menu-item index="/about">
        <el-icon><InfoFilled /></el-icon>
        <span>{{ i18n.t('router./about') }}</span>
      </el-menu-item>

      <!-- 菜单伸缩状态控制 -->
      <div class="collapse-controller" @click="handleCollapse">
        <el-icon v-if="menuStore.isCollapse"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon>
      </div>
    </el-menu>
  </el-scrollbar>
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
