<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard, ElDescriptions, ElDescriptionsItem, ElTag } from 'element-plus'
import { useGeolocation } from '@sky-fly/vhooks'

const i18n = useI18n()

const { geolocation } = useGeolocation()
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('feature.geo.longitude') }}</span>
          </template>
          <el-tag>{{ geolocation.longitude }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('feature.geo.latitude') }}</span>
          </template>
          <el-tag>{{ geolocation.latitude }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('feature.geo.accuracy') }}</span>
          </template>
          <el-tag>{{ geolocation.accuracy }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('feature.geo.altitude') }}</span>
          </template>
          <el-tag>{{ geolocation.altitude }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('feature.geo.altitudeAccuracy') }}</span>
          </template>
          <el-tag>{{ geolocation.altitudeAccuracy }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('feature.geo.heading') }}</span>
          </template>
          <el-tag>{{ geolocation.heading }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('feature.geo.speed') }}</span>
          </template>
          <el-tag>{{ geolocation.speed }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
