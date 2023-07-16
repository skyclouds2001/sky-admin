<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElDivider, ElDrawer, ElOption, ElSelect, ElSwitch } from 'element-plus'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useWakeLock } from '@sky-fly/shooks'
import { Lang, Theme } from '@/enum'
import { useColorWeakness, useGrayMode, useLang, useTheme } from '@/hook'
import { SettingDrawerKey } from '@/store'

const i18n = useI18n()

const isGrayMode = useGrayMode()

const isColorWeakness = useColorWeakness()

const { theme } = useTheme()

const { lang } = useLang()

const { isSupported, isActive, toggle } = useWakeLock()

const isShowSettingDrawer = inject<Ref<boolean>>(SettingDrawerKey) as Ref<boolean>
</script>

<template>
  <el-drawer v-model="isShowSettingDrawer" size="20%">
    <template #header>
      <h1 class="text-base font-bold drawer" style="color: var(--title-text-color)">{{ i18n.t('layout.setting.title') }}</h1>
    </template>

    <!-- 主题控件 -->
    <el-divider>
      <h4 class="font-bold">{{ i18n.t('layout.setting.theme') }}</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-switch v-model="theme" inline-prompt :active-icon="Sunny" :active-value="Theme.LIGHT" :inactive-icon="Moon" :inactive-value="Theme.DARK" name="theme" />
    </div>

    <!-- 国际化控件 -->
    <el-divider>
      <h4 class="font-bold">{{ i18n.t('layout.setting.i18n') }}</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-select v-model="lang" name="lang" placeholder="">
        <el-option v-for="item in Lang" :key="item" :label="item" :value="item" />
      </el-select>
    </div>

    <!-- 灰色模式控件 -->
    <el-divider>
      <h4 class="font-bold">{{ i18n.t('layout.setting.gray_mode') }}</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-switch v-model="isGrayMode" inline-prompt name="grey-mode" />
    </div>

    <!-- 色弱模式控件 -->
    <el-divider>
      <h4 class="font-bold">{{ i18n.t('layout.setting.color_weakness') }}</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-switch v-model="isColorWeakness" inline-prompt name="color-weakness" />
    </div>

    <!-- 唤醒锁定控件 -->
    <el-divider v-if="isSupported">
      <h4 class="font-bold">{{ i18n.t('layout.setting.wake_lock') }}</h4>
    </el-divider>
    <div v-if="isSupported" class="w-full text-center">
      <el-switch v-model="isActive" inline-prompt name="wake-lock" @change="toggle" />
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
:global(:has(.drawer)) {
  @apply m-0;
}
</style>
