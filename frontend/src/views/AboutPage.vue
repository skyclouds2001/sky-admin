<script setup lang="ts">
import { BUILD_TIME, PROJECT_AUTHOR_EMAIL, PROJECT_AUTHOR_HOME_PAGE, PROJECT_AUTHOR_NAME, PROJECT_DESCRIPTION, PROJECT_LICENSE, PROJECT_NAME, PROJECT_REPOSITORY, PROJECT_VERSION } from '@/config'
import { generateNpmLink } from '@/util'
import { ElCard, ElDescriptions, ElDescriptionsItem, ElLink, ElSpace, ElTag } from 'element-plus'
import { useI18n } from 'vue-i18n'
import packageConfig from '~/package.json'

const i18n = useI18n()
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <template #header>
        <div class="title">{{ i18n.t('about.title') }}</div>
      </template>
      <div class="text-left">{{ PROJECT_DESCRIPTION }}</div>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="title">{{ i18n.t('about.project.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('about.project.name') }}</span>
          </template>
          <el-tag>{{ PROJECT_NAME }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('about.project.version') }}</span>
          </template>
          <el-tag>{{ PROJECT_VERSION }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('about.project.license') }}</span>
          </template>
          <el-tag>{{ PROJECT_LICENSE }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('about.project.build-time') }}</span>
          </template>
          <el-tag>{{ BUILD_TIME }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('about.project.author') }}</span>
          </template>
          <el-tag>{{ PROJECT_AUTHOR_NAME }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('about.project.email') }}</span>
          </template>
          <el-link type="primary" :href="`mailto://${PROJECT_AUTHOR_EMAIL}`" target="_blank" :underline="false">{{ PROJECT_AUTHOR_EMAIL }}</el-link>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('about.project.website') }}</span>
          </template>
          <el-link type="primary" :href="PROJECT_AUTHOR_HOME_PAGE" target="_blank" :underline="false">{{ PROJECT_AUTHOR_HOME_PAGE }}</el-link>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('about.project.github') }}</span>
          </template>
          <el-link type="primary" :href="PROJECT_REPOSITORY" target="_blank" :underline="false">{{ PROJECT_REPOSITORY }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="title">{{ i18n.t('about.dependencies') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item v-for="[name, version] in Object.entries(packageConfig.dependencies)" :key="name">
          <template #label>
            <span class="font-bold">{{ name }}</span>
          </template>
          <el-link type="primary" :href="generateNpmLink(name)" target="_blank" :underline="false">{{ version }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="title">{{ i18n.t('about.devDependencies') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item v-for="[name, version] in Object.entries(packageConfig.devDependencies)" :key="name">
          <template #label>
            <span class="font-bold">{{ name }}</span>
          </template>
          <el-link type="primary" :href="generateNpmLink(name)" target="_blank" :underline="false">{{ version }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss">
.title {
  @apply text-left text-base font-bold;
}
</style>
