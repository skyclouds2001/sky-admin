<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard, ElDescriptions, ElDescriptionsItem, ElTag, ElLink } from 'element-plus'
import { PROJECT_AUTHOR_NAME, PROJECT_AUTHOR_EMAIL, PROJECT_AUTHOR_HOME_PAGE } from '@/config'

const i18n = useI18n()
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
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
