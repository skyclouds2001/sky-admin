<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElDrawer, ElDivider, ElSwitch, ElSelect, ElOption } from 'element-plus'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { Theme, Lang } from '@/enum'
import { useGrayMode, useColorWeakness, useTheme } from '@/hook'
import { useLangStore } from '@/store'

const i18n = useI18n()

const { isGrayMode } = useGrayMode()

const { isColorWeakness } = useColorWeakness()

const { theme } = useTheme()

const langStore = useLangStore()

const isShowSettingDrawer = inject<Ref<boolean>>('setting')

/**
 * 语言
 */
const lang = ref<Lang>(langStore.getLang.value)

/**
 * 语言变化事件
 *
 * @param lang 当前语言
 */
const handleLangChange = (lang: Lang): void => {
  langStore.setLang(lang)
}
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
      <el-select v-model="lang" name="lang" placeholder="" @change="handleLangChange">
        <el-option v-for="item in Lang" :key="item" :label="item" :value="item" />
      </el-select>
    </div>

    <!-- 灰色模式控件 -->
    <el-divider>
      <h4 class="font-bold">灰色模式</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-switch v-model="isGrayMode" inline-prompt name="grey-mode" />
    </div>

    <!-- 色弱模式控件 -->
    <el-divider>
      <h4 class="font-bold">色弱模式</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-switch v-model="isColorWeakness" inline-prompt name="color-weakness" />
    </div>
  </el-drawer>
</template>

<style scoped lang="scss"></style>

<style lang="scss">
:has(.drawer) {
  @apply m-0;
}
</style>
