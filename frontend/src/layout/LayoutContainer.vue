<script setup lang="ts">
import { ref, provide } from 'vue'
import { ElContainer, ElAside, ElHeader, ElMain, ElFooter, ElBacktop } from 'element-plus'
import { SettingDrawer } from '@/components'
import { MenuCollapseKey, SettingDrawerKey } from '@/constants'
import { PageFooter, PageHeader, PageSidebar, PageTabs } from '.'

const isShowSettingDrawer = ref(false)

provide(SettingDrawerKey, isShowSettingDrawer)

const isMenuCollapse = ref(false)

provide(MenuCollapseKey, isMenuCollapse)
</script>

<template>
  <el-container>
    <el-container class="main-container h-screen w-screen">
      <el-aside class="h-screen w-auto">
        <page-sidebar />
      </el-aside>
      <el-container class="page-container h-screen" :style="{ width: isMenuCollapse ? 'calc(100vw - 4rem)' : 'calc(100vw - 18rem)' }">
        <el-header class="border-b">
          <page-header />
        </el-header>
        <el-main class="content-container p-0">
          <page-tabs>
            <router-view />
          </page-tabs>
        </el-main>
        <el-footer class="border-t">
          <page-footer />
        </el-footer>
      </el-container>
    </el-container>

    <setting-drawer />

    <el-backtop :right="100" :bottom="100" />
  </el-container>
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
