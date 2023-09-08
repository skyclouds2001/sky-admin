<script setup lang="ts">
import { getCurrentInstance, inject, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElBreadcrumb, ElBreadcrumbItem, ElCalendar, ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElImage, ElMessage, ElMessageBox, ElPopover, ElTooltip } from 'element-plus'
import { FullScreen, Lock, Printer, Setting, Share, Unlock } from '@element-plus/icons-vue'
import { useFullscreen, useNow, usePointerLock, useShare, useStorage } from '@sky-fly/shooks'
import { PROJECT_AUTHOR_AVATAR, PROJECT_AUTHOR_NAME } from '@/config'
import { SettingDrawerKey } from '@/constants'
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

const isShowSettingDrawer = inject<Ref<boolean>>(SettingDrawerKey) as Ref<boolean>

/**
 * 控制展示设置窗口
 */
const showSettingDrawer = (): void => {
  isShowSettingDrawer.value = true
}

/**
 * 执行打印
 */
const print = (): void => {
  window.print()
}

/**
 * 分享操作
 */
const handleShare = async (): Promise<void> => {
  await share({
    title: document.title,
    url: location.href,
  })
}

/**
 * 打开关于页
 */
const routeToAbout = (): void => {
  void router.push('/about')
}

/**
 * 退出登录
 */
const exitLogin = (): void => {
  ElMessageBox.confirm(
    i18n.t(`layout.header.confirm-exit-login`),
    i18n.t(`warning`),
    {
      distinguishCancelAndClose: true,
      type: 'info',
      confirmButtonText: i18n.t(`confirm`),
      cancelButtonText: i18n.t(`cancel`),
    },
    appContext
  )
    .then(() => {
      storage.value = null
      void router.push('/login')
    })
    .catch(() => {
      ElMessage.info(
        {
          message: i18n.t(`layout.header.cancel-exit-login`),
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
      <el-breadcrumb-item v-for="item in store.pages" :key="item.path" :to="item.path">{{
        i18n.t(
          `router.${item.path
            .split('/')
            .filter((v) => v.length > 0)
            .concat(...(item.isView ? [] : ['title']))
            .join('.')}`
        )
      }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="control-bar">
      <el-popover trigger="click" :width="700">
        <template #reference>
          <el-tooltip :content="i18n.t('layout.header.date')">
            <div class="current-time">{{ now.toLocaleString() }}</div>
          </el-tooltip>
        </template>
        <el-calendar v-model="now" />
      </el-popover>

      <el-tooltip :content="i18n.t('layout.header.print')">
        <el-icon :size="20" class="printer" @click="print">
          <Printer />
        </el-icon>
      </el-tooltip>

      <el-tooltip :content="i18n.t(`layout.header.pointer-lock`)">
        <el-icon v-if="isSupportedPointerLock" :size="20" class="pointer-lock" @click="trigger">
          <Unlock v-if="isPointerLock" />
          <Lock v-else />
        </el-icon>
      </el-tooltip>

      <el-tooltip :content="i18n.t(`layout.header.fullscreen`)">
        <el-icon v-if="isSupportedFullscreen" :size="20" class="fullscreen" @click="toggleFullscreen">
          <FullScreen />
        </el-icon>
      </el-tooltip>

      <el-tooltip :content="i18n.t(`layout.header.share`)">
        <el-icon v-if="isSupportedShare" :size="20" class="share" @click="handleShare">
          <Share />
        </el-icon>
      </el-tooltip>

      <el-dropdown trigger="click">
        <div class="user">
          <div class="username">{{ PROJECT_AUTHOR_NAME }}</div>
          <div class="avatar">
            <el-image :src="PROJECT_AUTHOR_AVATAR" fit="cover" loading="lazy" lazy alt="avatar" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="routeToAbout">{{ i18n.t(`layout.header.about`) }}</el-dropdown-item>
            <el-dropdown-item @click="exitLogin">{{ i18n.t(`layout.header.exit_login`) }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-tooltip :content="i18n.t(`layout.header.settings`)">
        <el-icon :size="20" class="settings" @click="showSettingDrawer">
          <Setting />
        </el-icon>
      </el-tooltip>
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
      @apply mx-2;
      @apply cursor-pointer select-none;
    }

    .printer {
      @apply flex justify-center items-center;
      @apply cursor-pointer;
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
