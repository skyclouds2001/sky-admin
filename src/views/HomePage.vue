<script setup lang="ts">
import { shallowRef, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard, ElDescriptions, ElDescriptionsItem, ElTag, ElLink } from 'element-plus'
import { PROJECT_AUTHOR_NAME, PROJECT_AUTHOR_EMAIL, PROJECT_AUTHOR_HOME_PAGE } from '@/config'
import type { BrowserInfo } from '@/model'
import { generateBrowserInfo } from '@/util'

const i18n = useI18n()

const browserInfo = shallowRef<BrowserInfo | null>(null)

onBeforeMount(() => {
  browserInfo.value = generateBrowserInfo()
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">系统信息</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">系统</span>
          </template>
          <el-tag>{{ browserInfo.system ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">系统版本</span>
          </template>
          <el-tag>{{ browserInfo.systemVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">平台</span>
          </template>
          <el-tag>{{ browserInfo.platform ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">内核</span>
          </template>
          <el-tag>{{ browserInfo.engine ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">内核版本</span>
          </template>
          <el-tag>{{ browserInfo.engineVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">载体</span>
          </template>
          <el-tag>{{ browserInfo.supporter ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">载体版本</span>
          </template>
          <el-tag>{{ browserInfo.supporterVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">外壳</span>
          </template>
          <el-tag>{{ browserInfo.shell ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">外壳版本</span>
          </template>
          <el-tag>{{ browserInfo.shellVs ?? '' }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">{{ i18n.t('home.author') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.name') }}</span>
          </template>
          <el-tag>{{ PROJECT_AUTHOR_NAME }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.email') }}</span>
          </template>
          <el-tag>{{ PROJECT_AUTHOR_EMAIL }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.website') }}</span>
          </template>
          <el-link type="primary" :href="PROJECT_AUTHOR_HOME_PAGE" target="_blank" :underline="false">{{ i18n.t('home.website') }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
