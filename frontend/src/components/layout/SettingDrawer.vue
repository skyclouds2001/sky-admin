<script setup lang="ts">
import { LocalFontSelect } from '@/components'
import { SettingDrawerKey } from '@/constants'
import { Lang, Theme } from '@/enum'
import { useColorWeakness, useFont, useGrayMode, useLang, useTheme } from '@/hook'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useWakeLock } from '@sky-fly/sky-hooks'
import { ElDivider, ElDrawer, ElOption, ElSelect, ElSlider, ElSwitch } from 'element-plus'
import { inject, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const isGrayMode = useGrayMode()

const isColorWeakness = useColorWeakness()

const { theme } = useTheme()

const { lang } = useLang()

const { isWakeLock, toggle } = useWakeLock()

const isShowSettingDrawer = inject(SettingDrawerKey) as Ref<boolean>

const vibrate = ref(0)

const font = useFont()
</script>

<template>
  <el-drawer v-model="isShowSettingDrawer" size="20%">
    <template #header>
      <h1 class="drawer text-base font-bold" style="color: var(--title-text-color)">{{ i18n.t('layout.setting.title') }}</h1>
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
    <el-divider>
      <h4 class="font-bold">{{ i18n.t('layout.setting.wake_lock') }}</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-switch v-model="isWakeLock" inline-prompt name="wake-lock" @change="toggle" />
    </div>

    <!-- 振动设置控件 -->
    <el-divider>
      <h4 class="font-bold">{{ i18n.t('layout.setting.vibrate') }}</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-slider v-model="vibrate" name="vibrate" />
    </div>

    <!-- 字体控件 -->
    <el-divider>
      <h4 class="font-bold">{{ i18n.t('layout.setting.font') }}</h4>
    </el-divider>
    <div class="w-full text-center">
      <local-font-select v-model="font" />
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
:global(:has(.drawer)) {
  @apply m-0;
}
</style>
