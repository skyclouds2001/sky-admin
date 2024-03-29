<script setup lang="ts">
import { MenuCollapseKey } from '@/constants'
import { useTabsStore } from '@/store'
import { Calendar, Collection, Document, Expand, Fold, Histogram, HomeFilled, InfoFilled, Link, List, MapLocation, Menu, Monitor, Service, Tools, Warning } from '@element-plus/icons-vue'
import { ElIcon, ElMenu, ElMenuItem, ElScrollbar, ElSubMenu } from 'element-plus'
import { computed, inject, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const store = useTabsStore()

const currentPath = computed(() => store.currentTab)

const isMenuCollapse = inject(MenuCollapseKey) as Ref<boolean>

const handleCollapse = (): void => {
  isMenuCollapse.value = !isMenuCollapse.value
}
</script>

<template>
  <el-scrollbar wrap-class="wrap" view-class="view">
    <el-menu router :default-active="currentPath" :collapse="isMenuCollapse" :class="['page-sidebar', isMenuCollapse ? 'w-16' : 'w-[18rem]', 'min-h-screen', 'pb-10']">
      <!-- 首页 -->
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <span>{{ i18n.t('router.home') }}</span>
      </el-menu-item>

      <!-- 表格 -->
      <el-sub-menu index="/table">
        <template #title>
          <el-icon><List /></el-icon>
          <span>{{ i18n.t('router.table.title') }}</span>
        </template>
        <el-menu-item index="/table/base">
          <el-icon><List /></el-icon>
          <span>{{ i18n.t('router.table.base') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 表单 -->
      <el-sub-menu index="/form">
        <template #title>
          <el-icon><Calendar /></el-icon>
          <span>{{ i18n.t('router.form.title') }}</span>
        </template>
        <el-menu-item index="/form/base">
          <el-icon><Calendar /></el-icon>
          <span>{{ i18n.t('router.form.base') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 组件 -->
      <el-sub-menu index="/component">
        <template #title>
          <el-icon><Collection /></el-icon>
          <span>{{ i18n.t('router.component.title') }}</span>
        </template>
        <el-menu-item index="/component/icon">
          <el-icon><Collection /></el-icon>
          <span>{{ i18n.t('router.component.icon') }}</span>
        </el-menu-item>
        <el-menu-item index="/component/terminal">
          <el-icon><Collection /></el-icon>
          <span>{{ i18n.t('router.component.terminal') }}</span>
        </el-menu-item>
        <el-menu-item index="/component/controllable">
          <el-icon><Collection /></el-icon>
          <span>{{ i18n.t('router.component.controllable') }}</span>
        </el-menu-item>
        <el-menu-item index="/component/rich-text-editor">
          <el-icon><Collection /></el-icon>
          <span>{{ i18n.t('router.component.rich-text-editor') }}</span>
        </el-menu-item>
        <el-menu-item index="/component/markdown-editor">
          <el-icon><Collection /></el-icon>
          <span>{{ i18n.t('router.component.markdown-editor') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 图表 -->
      <el-sub-menu index="/chart">
        <template #title>
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router.chart.title') }}</span>
        </template>
        <el-menu-item index="/chart/bar">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router.chart.bar') }}</span>
        </el-menu-item>
        <el-menu-item index="/chart/line">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router.chart.line') }}</span>
        </el-menu-item>
        <el-menu-item index="/chart/pie">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router.chart.pie') }}</span>
        </el-menu-item>
        <el-menu-item index="/chart/scatter">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router.chart.scatter') }}</span>
        </el-menu-item>
        <el-menu-item index="/chart/candlestick">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router.chart.candlestick') }}</span>
        </el-menu-item>
        <el-menu-item index="/chart/radar">
          <el-icon><Histogram /></el-icon>
          <span>{{ i18n.t('router.chart.radar') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 地图 -->
      <el-sub-menu index="/map">
        <template #title>
          <el-icon><MapLocation /></el-icon>
          <span>{{ i18n.t('router.map.title') }}</span>
        </template>
        <el-menu-item index="/map/3d-earth">
          <el-icon><MapLocation /></el-icon>
          <span>{{ i18n.t('router.map.3d-earth') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 嵌套菜单 -->
      <el-sub-menu index="/route">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>{{ i18n.t('router.route') }}</span>
        </template>
        <el-menu-item index="/route/1">
          <el-icon><Menu /></el-icon>
          <span>{{ i18n.t('router.route', [[1]]) }}</span>
        </el-menu-item>
        <el-sub-menu index="/route/2">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>{{ i18n.t('router.route', [[2]]) }}</span>
          </template>
          <el-menu-item index="/route/2/1">
            <el-icon><Menu /></el-icon>
            <span>{{ i18n.t('router.route', [[2, 1]]) }}</span>
          </el-menu-item>
          <el-sub-menu index="/route/2/2">
            <template #title>
              <el-icon><Menu /></el-icon>
              <span>{{ i18n.t('router.route', [[2, 2]]) }}</span>
            </template>
            <el-menu-item index="/route/2/2/1">
              <el-icon><Menu /></el-icon>
              <span>{{ i18n.t('router.route', [[2, 2, 1]]) }}</span>
            </el-menu-item>
            <el-menu-item index="/route/2/2/2">
              <el-icon><Menu /></el-icon>
              <span>{{ i18n.t('router.route', [[2, 2, 2]]) }}</span>
            </el-menu-item>
            <el-menu-item index="/route/2/2/3">
              <el-icon><Menu /></el-icon>
              <span>{{ i18n.t('router.route', [[2, 2, 3]]) }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/route/2/3">
            <el-icon><Menu /></el-icon>
            <span>{{ i18n.t('router.route', [[2, 3]]) }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/route/3">
          <el-icon><Menu /></el-icon>
          <span>{{ i18n.t('router.route', [[3]]) }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 文档 -->
      <el-sub-menu index="/docs">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router.docs.title') }}</span>
        </template>
        <el-menu-item index="/docs/word-preview">
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router.docs.word-preview') }}</span>
        </el-menu-item>
        <el-menu-item index="/docs/excel-preview">
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router.docs.excel-preview') }}</span>
        </el-menu-item>
        <el-menu-item index="/docs/ppt-preview">
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router.docs.ppt-preview') }}</span>
        </el-menu-item>
        <el-menu-item index="/docs/pdf-preview">
          <el-icon><Document /></el-icon>
          <span>{{ i18n.t('router.docs.pdf-preview') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 功能 -->
      <el-sub-menu index="/feature">
        <template #title>
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.title') }}</span>
        </template>
        <el-menu-item index="/feature/bar-code">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.bar-code') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/qrcode">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.qrcode') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/image-editor">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.image-editor') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/encode-decode">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.encode-decode') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/encrypt-decrypt">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.encrypt-decrypt') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/code-highlight">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.code-highlight') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/image-compress">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.image-compress') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/camera-record">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.camera-record') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/screen-record">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.screen-record') }}</span>
        </el-menu-item>
        <el-menu-item index="/feature/animation-effect">
          <el-icon><Service /></el-icon>
          <span>{{ i18n.t('router.feature.animation-effect') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 系统监控 -->
      <el-sub-menu index="/monitor">
        <template #title>
          <el-icon><Monitor /></el-icon>
          <span>{{ i18n.t('router.monitor.title') }}</span>
        </template>
      </el-sub-menu>

      <!-- 系统管理 -->
      <el-sub-menu index="/system">
        <template #title>
          <el-icon><Tools /></el-icon>
          <span>{{ i18n.t('router.system.title') }}</span>
        </template>
        <el-menu-item index="/system/department">
          <el-icon><Tools /></el-icon>
          <span>{{ i18n.t('router.system.department') }}</span>
        </el-menu-item>
        <el-menu-item index="/system/role">
          <el-icon><Tools /></el-icon>
          <span>{{ i18n.t('router.system.role') }}</span>
        </el-menu-item>
        <el-menu-item index="/system/user">
          <el-icon><Tools /></el-icon>
          <span>{{ i18n.t('router.system.user') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 异常 -->
      <el-sub-menu index="/error">
        <template #title>
          <el-icon><Warning /></el-icon>
          <span>{{ i18n.t('router.error.title') }}</span>
        </template>
        <el-menu-item index="/error/403">
          <el-icon><Warning /></el-icon>
          <span>{{ i18n.t('router.error.403') }}</span>
        </el-menu-item>
        <el-menu-item index="/error/404">
          <el-icon><Warning /></el-icon>
          <span>{{ i18n.t('router.error.404') }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 外链 -->
      <el-sub-menu index="/link">
        <template #title>
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.title') }}</span>
        </template>
        <el-menu-item :index="`/link/${encodeURIComponent('https://github.com/skyclouds2001')}/external`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.github') }} ({{ i18n.t('router.link.external') }})</span>
        </el-menu-item>
        <el-menu-item :index="`/link/${encodeURIComponent('https://skyclouds2001.github.io')}/external`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.blog') }} ({{ i18n.t('router.link.external') }})</span>
        </el-menu-item>
        <el-menu-item :index="`/link/${encodeURIComponent('https://skyclouds2001.github.io')}/internal`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.blog') }} ({{ i18n.t('router.link.internal') }})</span>
        </el-menu-item>
        <el-menu-item :index="`/link/${encodeURIComponent('https://juejin.cn/user/814058986548567')}/external`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.juejin') }} ({{ i18n.t('router.link.external') }})</span>
        </el-menu-item>
        <el-menu-item :index="`/link/${encodeURIComponent('https://juejin.cn/user/814058986548567')}/internal`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.juejin') }} ({{ i18n.t('router.link.internal') }})</span>
        </el-menu-item>
        <el-menu-item :index="`/link/${encodeURIComponent('https://cn.vitejs.dev/')}/external`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.vite') }} ({{ i18n.t('router.link.external') }})</span>
        </el-menu-item>
        <el-menu-item :index="`/link/${encodeURIComponent('https://cn.vitejs.dev/')}/internal`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.vite') }} ({{ i18n.t('router.link.internal') }})</span>
        </el-menu-item>
        <el-menu-item :index="`/link/${encodeURIComponent('https://cn.vuejs.org/')}/external`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.vue') }} ({{ i18n.t('router.link.external') }})</span>
        </el-menu-item>
        <el-menu-item :index="`/link/${encodeURIComponent('https://cn.vuejs.org/')}/internal`">
          <el-icon><Link /></el-icon>
          <span>{{ i18n.t('router.link.vue') }} ({{ i18n.t('router.link.internal') }})</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 关于 -->
      <el-menu-item index="/about">
        <el-icon><InfoFilled /></el-icon>
        <span>{{ i18n.t('router.about') }}</span>
      </el-menu-item>

      <!-- 菜单伸缩状态控制 -->
      <div class="collapse-controller" @click="handleCollapse">
        <el-icon v-if="isMenuCollapse"><Expand /></el-icon>
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
  @apply select-none;

  .el-menu-item.is-active {
    background-color: #4091f7 !important;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    color: #f2f3f4 !important;
  }

  .collapse-controller {
    @apply absolute bottom-0 left-0;
    @apply h-8 w-full px-5;
    @apply text-left text-xl leading-8;

    color: #409eff;
  }
}
</style>
