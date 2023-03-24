<script setup lang="ts">
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard, ElDescriptions, ElDescriptionsItem, ElTag, ElLink } from 'element-plus'
import { PROJECT_AUTHOR_NAME, PROJECT_AUTHOR_EMAIL, PROJECT_AUTHOR_HOME_PAGE } from '@/config'
import { useBattery, useOnline, useNetwork } from '@/hook'
import { generateBrowserInfo } from '@/util'

const i18n = useI18n()

const browserInfo = shallowRef(generateBrowserInfo())

const { isOnline } = useOnline()

const { battery, isSupported: isSupportedBattery } = useBattery()

const { isSupported: isSupportedConnection, connection } = useNetwork()
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">{{ i18n.t('home.system.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.system') }}</span>
          </template>
          <el-tag>{{ browserInfo.system ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.systemVs') }}</span>
          </template>
          <el-tag>{{ browserInfo.systemVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.platform') }}</span>
          </template>
          <el-tag>{{ browserInfo.platform ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.engine') }}</span>
          </template>
          <el-tag>{{ browserInfo.engine ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.engineVs') }}</span>
          </template>
          <el-tag>{{ browserInfo.engineVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.supporter') }}</span>
          </template>
          <el-tag>{{ browserInfo.supporter ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.supporterVs') }}</span>
          </template>
          <el-tag>{{ browserInfo.supporterVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.shell') }}</span>
          </template>
          <el-tag>{{ browserInfo.shell ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.shellVs') }}</span>
          </template>
          <el-tag>{{ browserInfo.shellVs ?? '' }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item v-if="isSupportedBattery">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.charge') }}</span>
          </template>
          <el-tag>{{ battery.charging ? i18n.t('home.system.charging') : i18n.t('home.system.discharging') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedBattery">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.chargingTime') }}</span>
          </template>
          <el-tag>{{ battery.chargingTime !== Infinity ? `${battery.chargingTime}s` : battery.chargingTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedBattery">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.dischargingTime') }}</span>
          </template>
          <el-tag>{{ battery.dischargingTime !== Infinity ? `${battery.dischargingTime}s` : battery.dischargingTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedBattery">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.level') }}</span>
          </template>
          <el-tag>{{ battery.level }}%</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.net') }}</span>
          </template>
          <el-tag>{{ isOnline ? i18n.t('home.system.online') : i18n.t('home.system.offline') }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item v-if="isSupportedConnection && connection.type">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.type') }}</span>
          </template>
          <el-tag>{{ connection.type }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection && connection.effectiveType">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.effectiveType') }}</span>
          </template>
          <el-tag>{{ connection.effectiveType }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection && connection.downlink">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.downlink') }}</span>
          </template>
          <el-tag>{{ connection.downlink }}Mb/s</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection && connection.downlinkMax">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.downlinkMax') }}</span>
          </template>
          <el-tag>{{ connection.downlinkMax }}Mb/s</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection && connection.rtt">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.rtt') }}</span>
          </template>
          <el-tag>{{ connection.rtt }}s</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">{{ i18n.t('home.author.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.author.name') }}</span>
          </template>
          <el-tag>{{ PROJECT_AUTHOR_NAME }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.author.email') }}</span>
          </template>
          <el-tag>{{ PROJECT_AUTHOR_EMAIL }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.author.website') }}</span>
          </template>
          <el-link type="primary" :href="PROJECT_AUTHOR_HOME_PAGE" target="_blank" :underline="false">{{ i18n.t('home.author.website') }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
