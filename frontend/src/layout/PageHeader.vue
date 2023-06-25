<script setup lang="ts">
import { getCurrentInstance, inject, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElBreadcrumb, ElBreadcrumbItem, ElDropdown, ElDropdownMenu, ElDropdownItem, ElImage, ElIcon, ElMessageBox, ElMessage } from 'element-plus'
import { FullScreen, Lock, Setting, Share, Unlock } from '@element-plus/icons-vue'
import { useFullscreen, useNow, usePointerLock, useShare, useStorage } from 'shooks'
import { PROJECT_AUTHOR_NAME, PROJECT_AUTHOR_AVATAR } from '@/config'
import { usePagesStore } from '@/store'

const appContext = getCurrentInstance()?.appContext

const router = useRouter()

const i18n = useI18n()

const store = usePagesStore()

const { isSupported: isSupportedFullscreen, toggle: toggleFullscreen } = useFullscreen()

const now = useNow()

const { isSupported: isSupportedPointerLock, isPointerLock, trigger } = usePointerLock()

const { isSupported: isSupportedShare, share } = useShare()

const storage = useStorage<string>('token', {
  prefix: 'sky-admin-0.0.0',
})

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

/**
 * 退出登录
 */
const exitLogin = () => {
  ElMessageBox.confirm(
    '确认退出登录？',
    '警告',
    {
      distinguishCancelAndClose: true,
      type: 'info',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    },
    appContext
  )
    .then(() => {
      storage.value = null
      router.push('/login')
    })
    .catch(() => {
      ElMessage.info(
        {
          message: '取消退出登录',
          showClose: true,
          center: true,
          grouping: true,
        },
        appContext
      )
    })
}
</script>

<template>
  <div class="page-header">
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item v-for="item in store.pages" :key="item.name" :to="item.path">{{ i18n.t(`router.${item.path}`) }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="control-bar">
      <div class="current-time">{{ now.toLocaleString() }}</div>
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
      <el-dropdown trigger="click">
        <div class="user">
          <div class="username">{{ PROJECT_AUTHOR_NAME }}</div>
          <div class="avatar">
            <el-image :src="PROJECT_AUTHOR_AVATAR" fit="cover" loading="lazy" lazy alt="avatar" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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

    .current-time {
      @apply cursor-default select-none mx-2;
    }

    .pointer-lock {
      @apply flex justify-center items-center;
      @apply cursor-pointer;
    }

    .fullscreen {
      @apply flex justify-center items-center;
      @apply cursor-pointer;
    }

    .share {
      @apply flex justify-center items-center;
      @apply cursor-pointer;
    }

    .user {
      @apply flex justify-center items-center;

      .avatar {
        @apply w-8 h-8 mx-1;
        @apply overflow-hidden;

        :deep(img) {
          @apply w-8 h-8;
          @apply rounded-full;
          @apply select-none;
        }
      }

      .username {
        @apply text-base mx-1;
        @apply select-none;
      }
    }

    .settings {
      @apply flex justify-center items-center;
      @apply cursor-pointer;
    }
  }
}
</style>
