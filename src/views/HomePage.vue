<script setup lang="ts">
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElSpace, ElCard, ElDescriptions, ElDescriptionsItem, ElTag, ElLink } from 'element-plus'
import { PROJECT_AUTHOR_NAME, PROJECT_AUTHOR_EMAIL, PROJECT_AUTHOR_HOME_PAGE } from '@/config'
import { useBattery, useNetwork, useOnline, useScreenOrientation, useTimestamp } from '@/hook'
import { generateBrowserInfo } from '@/util'

const i18n = useI18n()

const browserInfo = shallowRef(generateBrowserInfo())

const { isOnline } = useOnline()

const { battery, isSupported: isSupportedBattery } = useBattery()

const { isSupported: isSupportedConnection, connection } = useNetwork()

const { isSupported: isSupportedScreenOrientation, angel, type } = useScreenOrientation()

const timestamp = useTimestamp()
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

        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.processor') }}</span>
          </template>
          <el-tag>{{ browserInfo.processors }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.memory') }}</span>
          </template>
          <el-tag>{{ browserInfo.memory }}GiB</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.touchPoint') }}</span>
          </template>
          <el-tag>{{ browserInfo.touchPoints }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.isSecureContext') }}</span>
          </template>
          <el-tag>{{ browserInfo.isSecureContext }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.cookie') }}</span>
          </template>
          <el-tag>{{ browserInfo.cookie ? i18n.t('home.system.enabled') : i18n.t('home.system.disabled') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.pdf') }}</span>
          </template>
          <el-tag>{{ browserInfo.pdf ? i18n.t('home.system.supported') : i18n.t('home.system.unsupported') }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item v-if="isSupportedScreenOrientation">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.angel-o') }}</span>
          </template>
          <el-tag>{{ angel }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedScreenOrientation">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.type-o') }}</span>
          </template>
          <el-tag>{{ type }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.timestamp') }}</span>
          </template>
          <el-tag>{{ timestamp }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">{{ i18n.t('home.network.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.network.net') }}</span>
          </template>
          <el-tag>{{ isOnline ? i18n.t('home.network.online') : i18n.t('home.network.offline') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.network.type') }}</span>
          </template>
          <el-tag>{{ connection.type ?? '-' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.network.effectiveType') }}</span>
          </template>
          <el-tag>{{ connection.effectiveType ?? '-' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.network.downlink') }}</span>
          </template>
          <el-tag>{{ connection.downlink ? `${connection.downlink}Mb/s` : '-' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.network.downlinkMax') }}</span>
          </template>
          <el-tag>{{ connection.downlinkMax ? `${connection.downlinkMax}Mb/s` : '-' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedConnection">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.network.rtt') }}</span>
          </template>
          <el-tag>{{ connection.rtt ? `${connection.rtt}s` : '-' }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">{{ i18n.t('home.battery.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item v-if="isSupportedBattery">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.battery.charge') }}</span>
          </template>
          <el-tag>{{ battery.charging ? i18n.t('home.battery.charging') : i18n.t('home.battery.discharging') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedBattery">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.battery.chargingTime') }}</span>
          </template>
          <el-tag>{{ battery.chargingTime !== Infinity ? `${battery.chargingTime}s` : battery.chargingTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedBattery">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.battery.dischargingTime') }}</span>
          </template>
          <el-tag>{{ battery.dischargingTime !== Infinity ? `${battery.dischargingTime}s` : battery.dischargingTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedBattery">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.battery.level') }}</span>
          </template>
          <el-tag>{{ battery.level }}%</el-tag>
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
