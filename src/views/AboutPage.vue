<script setup lang="ts">
import { ElSpace, ElCard, ElDescriptions, ElDescriptionsItem, ElTag, ElLink } from 'element-plus'
import packageConfig from '~/package.json'
import { PROJECT_NAME, PROJECT_DESCRIPTION, PROJECT_VERSION, PROJECT_LICENSE, PROJECT_AUTHOR, PROJECT_REPOSITORY } from '@/config'
import { generateNpmLink } from '@/util'
</script>

<template>
  <el-space direction="vertical" fill size="large">
    <el-card shadow="always">
      <template #header>
        <div class="title">关于</div>
      </template>
      <div class="content">{{ PROJECT_DESCRIPTION }}</div>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="title">项目信息</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">名称</span>
          </template>
          <el-tag>{{ PROJECT_NAME }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">版本</span>
          </template>
          <el-tag>{{ PROJECT_VERSION }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">许可证</span>
          </template>
          <el-tag>{{ PROJECT_LICENSE }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">作者</span>
          </template>
          <el-tag>{{ PROJECT_AUTHOR }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">GitHub</span>
          </template>
          <el-link type="primary" :href="PROJECT_REPOSITORY" target="_blank" :underline="false">GitHub</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="title">生产环境依赖</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item v-for="item in Object.entries(packageConfig.dependencies)" :key="item[0]">
          <template #label>
            <span class="font-bold">{{ item[0] }}</span>
          </template>
          <el-link type="primary" :href="`https://www.npmjs.com/package/${item[0]}`" target="_blank" :underline="false">{{ item[1] }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="title">开发环境依赖</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item v-for="item in Object.entries(packageConfig.devDependencies)" :key="item[0]">
          <template #label>
            <span class="font-bold">{{ item[0] }}</span>
          </template>
          <el-link type="primary" :href="generateNpmLink(item[0])" target="_blank" :underline="false">{{ item[1] }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss">
.title {
  @apply text-left font-bold;
}

.content {
  @apply text-left;
}
</style>
