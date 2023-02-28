<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { ElDrawer, ElDivider, ElSwitch, ElSelect, ElOption } from 'element-plus'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { Theme, Lang } from '@/enum'
import { useThemeStore, useLangStore } from '@/store'

const themeStore = useThemeStore()

const langStore = useLangStore()

const isShowSettingDrawer = inject<Ref<boolean>>('setting')

/**
 * 主题
 */
const theme = ref<Theme>(themeStore.getTheme.value)

/**
 * 主题开关变化事件
 *
 * @param theme 当前主题
 */
const handleThemeChange = (theme: Theme): void => {
  themeStore.setTheme(theme)
}

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
      <h1 class="text-base font-bold drawer" style="color: var(--title-text-color)">设置</h1>
    </template>

    <!-- 主题控件 -->
    <el-divider>
      <h4 class="font-bold">主题</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-switch v-model="theme" inline-prompt :active-icon="Sunny" :active-value="Theme.LIGHT" :inactive-icon="Moon" :inactive-value="Theme.DARK" name="theme" @change="handleThemeChange" />
    </div>

    <!-- 国际化控件 -->
    <el-divider>
      <h4 class="font-bold">国际化</h4>
    </el-divider>
    <div class="w-full text-center">
      <el-select v-model="lang" name="lang" placeholder="" @change="handleLangChange">
        <el-option v-for="item in Lang" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss"></style>

<style lang="scss">
:has(.drawer) {
  @apply m-0;
}
</style>
