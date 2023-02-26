<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { ElDrawer, ElDivider, ElSwitch } from 'element-plus'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { Theme } from '@/enum'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

const isShowSettingDrawer = inject<Ref<boolean>>('setting')

/**
 * 主题
 */
const theme = ref<Theme>(themeStore.theme.value)

/**
 * 主题开关变化事件
 *
 * @param theme 当前主题
 */
const handleThemeChange = (theme: Theme): void => {
  themeStore.setTheme(theme)
}
</script>

<template>
  <el-drawer v-model="isShowSettingDrawer" size="20%">
    <template #header>
      <h1 class="text-base font-bold" style="color: var(--title-text-color)">设置</h1>
    </template>

    <el-divider>
      <h4 class="font-bold">主题</h4>
    </el-divider>
    <el-switch v-model="theme" inline-prompt :active-icon="Sunny" :active-value="Theme.LIGHT" :inactive-icon="Moon" :inactive-value="Theme.DARK" name="theme" @change="handleThemeChange" />
  </el-drawer>
</template>

<style scoped lang="scss"></style>
