<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem, ElImage, ElIcon } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { PROJECT_AUTHOR_NAME, PROJECT_AUTHOR_AVATAR } from '@/config'
import { usePagesStore } from '@/store'

const store = usePagesStore()

const isShowSettingDrawer = inject<Ref<boolean>>('setting')

/**
 * 控制展示设置窗口
 */
const showSettingDrawer = () => {
  if (isShowSettingDrawer) {
    isShowSettingDrawer.value = true
  }
}
</script>

<template>
  <div class="page-header">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="item in store.pages" :key="item.name" :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="control-bar">
      <div class="avatar">
        <el-image :src="PROJECT_AUTHOR_AVATAR" fit="cover" loading="lazy" lazy alt="avatar" />
      </div>
      <div class="username">{{ PROJECT_AUTHOR_NAME }}</div>
      <div class="settings" @click="showSettingDrawer">
        <el-icon :size="20"><Setting /></el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-header {
  @apply flex justify-between items-center;

  height: 100%;

  .control-bar {
    @apply flex justify-center items-center;

    > * {
      @apply mx-1;
    }

    .avatar {
      @apply w-8 h-8;
      @apply overflow-hidden;

      :deep(img) {
        @apply w-8 h-8;
        @apply rounded-full;
      }
    }

    .username {
      @apply cursor-default select-none;
    }

    .settings {
      @apply flex justify-center items-center;
    }
  }
}
</style>
