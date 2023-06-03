<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElBreadcrumb, ElBreadcrumbItem, ElImage, ElIcon } from 'element-plus'
import { FullScreen, Lock, Setting, Share, Unlock } from '@element-plus/icons-vue'
import { PROJECT_AUTHOR_NAME, PROJECT_AUTHOR_AVATAR } from '@/config'
import { useFullscreen, usePointerLock, useShare } from '@/hook'
import { usePagesStore } from '@/store'

const i18n = useI18n()

const store = usePagesStore()

const { isSupported: isSupportedFullscreen, toggle: toggleFullscreen } = useFullscreen()

const { isSupported: isSupportedPointerLock, isPointerLock, trigger } = usePointerLock()

const { isSupported: isSupportedShare, share } = useShare()

const isShowSettingDrawer = inject<Ref<boolean>>('setting')

/**
 * 控制展示设置窗口
 */
const showSettingDrawer = () => {
  if (isShowSettingDrawer) {
    isShowSettingDrawer.value = true
  }
}

/**
 * 分享操作
 */
const handleShare = () => {
  share({
    title: document.title,
    url: location.href,
  })
}
</script>

<template>
  <div class="page-header">
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item v-for="item in store.pages" :key="item.name" :to="item.path">{{ i18n.t(`router.${item.path}`) }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="control-bar">
      <div v-if="isSupportedPointerLock" class="pointer-lock" @click="trigger">
        <el-icon :size="20">
          <Unlock v-if="isPointerLock" />
          <Lock v-else />
        </el-icon>
      </div>
      <div v-if="isSupportedFullscreen" class="fullscreen" @click="toggleFullscreen">
        <el-icon :size="20"><FullScreen /></el-icon>
      </div>
      <div v-if="isSupportedShare" class="share" @click="handleShare">
        <el-icon :size="20"><Share /></el-icon>
      </div>
      <div class="settings" @click="showSettingDrawer">
        <el-icon :size="20"><Setting /></el-icon>
      </div>
      <div class="username">{{ PROJECT_AUTHOR_NAME }}</div>
      <div class="avatar">
        <el-image :src="PROJECT_AUTHOR_AVATAR" fit="cover" loading="lazy" lazy alt="avatar" />
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

    .pointer-lock {
      @apply flex justify-center items-center;
    }

    .fullscreen {
      @apply flex justify-center items-center;
    }

    .share {
      @apply flex justify-center items-center;
    }

    .avatar {
      @apply w-8 h-8;
      @apply overflow-hidden;

      :deep(img) {
        @apply w-8 h-8;
        @apply rounded-full;
        @apply select-none;
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
