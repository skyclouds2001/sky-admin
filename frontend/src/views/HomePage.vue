<script setup lang="ts">
import { getServerInfo } from '@/api'
import { PROJECT_AUTHOR_EMAIL, PROJECT_AUTHOR_HOME_PAGE, PROJECT_AUTHOR_NAME } from '@/config'
import { generateSystemInfo } from '@/util'
import { useBattery, useDocumentActiveElement, useDocumentReadyState, useDocumentVisibility, useLocation, useNetwork, useOnline, useScreenOrientation, useTimestamp } from '@sky-fly/sky-hooks'
import { ElCard, ElDescriptions, ElDescriptionsItem, ElLink, ElSpace, ElTag } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const systemInfo = generateSystemInfo()

const { data: serverInfo } = await getServerInfo()

const screenInfo = window.screen

const { battery, isSupported: isSupportedBattery } = useBattery()

const activeElement = useDocumentActiveElement()

const readyState = useDocumentReadyState()

const visibility = useDocumentVisibility()

const location = useLocation()

const { connection, isSupported: isSupportedConnection } = useNetwork()

const { isOnline } = useOnline()

const { angel, isSupported: isSupportedScreenOrientation, type } = useScreenOrientation()

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
          <el-tag>{{ systemInfo.system ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.systemVs') }}</span>
          </template>
          <el-tag>{{ systemInfo.systemVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.platform') }}</span>
          </template>
          <el-tag>{{ systemInfo.platform ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.engine') }}</span>
          </template>
          <el-tag>{{ systemInfo.engine ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.engineVs') }}</span>
          </template>
          <el-tag>{{ systemInfo.engineVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.supporter') }}</span>
          </template>
          <el-tag>{{ systemInfo.supporter ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.supporterVs') }}</span>
          </template>
          <el-tag>{{ systemInfo.supporterVs ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.shell') }}</span>
          </template>
          <el-tag>{{ systemInfo.shell ?? '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.shellVs') }}</span>
          </template>
          <el-tag>{{ systemInfo.shellVs ?? '' }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.processor') }}</span>
          </template>
          <el-tag>{{ systemInfo.processors }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.memory') }}</span>
          </template>
          <el-tag>{{ systemInfo.memory }}GiB</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.touchPoint') }}</span>
          </template>
          <el-tag>{{ systemInfo.touchPoints }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.isSecureContext') }}</span>
          </template>
          <el-tag>{{ systemInfo.isSecureContext ? i18n.t('home.yes') : i18n.t('home.no') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.crossOriginIsolated') }}</span>
          </template>
          <el-tag>{{ systemInfo.crossOriginIsolated ? i18n.t('home.yes') : i18n.t('home.no') }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.cookie') }}</span>
          </template>
          <el-tag>{{ systemInfo.cookie ? i18n.t('home.enabled') : i18n.t('home.disabled') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.pdf') }}</span>
          </template>
          <el-tag>{{ systemInfo.pdf ? i18n.t('home.supported') : i18n.t('home.unsupported') }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.system.ip') }}</span>
          </template>
          <el-tag>{{ serverInfo.ip }}</el-tag>
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
        <div class="text-left text-base font-bold">{{ i18n.t('home.server.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.hostname') }}</span>
          </template>
          <el-tag>{{ serverInfo.hostname }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.type') }}</span>
          </template>
          <el-tag>{{ serverInfo.type }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.release') }}</span>
          </template>
          <el-tag>{{ serverInfo.release }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.machine') }}</span>
          </template>
          <el-tag>{{ serverInfo.machine }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.username') }}</span>
          </template>
          <el-tag>{{ serverInfo.username }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.uptime') }}</span>
          </template>
          <el-tag>{{ serverInfo.uptime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.version') }}</span>
          </template>
          <el-tag>{{ serverInfo.version }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.totalmem') }}</span>
          </template>
          <el-tag>{{ serverInfo.totalmem }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.freemem') }}</span>
          </template>
          <el-tag>{{ serverInfo.freemem }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.nodeUptime') }}</span>
          </template>
          <el-tag>{{ serverInfo.nodeUptime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.server.nodeVersion') }}</span>
          </template>
          <el-tag>{{ serverInfo.nodeVersion }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">{{ i18n.t('home.website.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.website.href') }}</span>
          </template>
          <el-tag>{{ location.href }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.website.protocol') }}</span>
          </template>
          <el-tag>{{ location.protocol.replaceAll(':', '') }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.website.hostname') }}</span>
          </template>
          <el-tag>{{ location.hostname }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.website.port') }}</span>
          </template>
          <el-tag>{{ location.port }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.website.pathname') }}</span>
          </template>
          <el-tag>{{ location.pathname }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.website.hash') }}</span>
          </template>
          <el-tag>{{ `#${location.hash}` }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">{{ i18n.t('home.document.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.document.activeElement') }}</span>
          </template>
          <el-tag>{{ activeElement?.localName ?? 'unknown' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.document.readyState') }}</span>
          </template>
          <el-tag>{{ readyState }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.document.visibility') }}</span>
          </template>
          <el-tag>{{ visibility }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always">
      <template #header>
        <div class="text-left text-base font-bold">{{ i18n.t('home.screen.title') }}</div>
      </template>
      <el-descriptions border>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.screen.height') }}</span>
          </template>
          <el-tag>{{ screenInfo.height }}px</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.screen.width') }}</span>
          </template>
          <el-tag>{{ screenInfo.width }}px</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.screen.availHeight') }}</span>
          </template>
          <el-tag>{{ screenInfo.availHeight }}px</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.screen.availWidth') }}</span>
          </template>
          <el-tag>{{ screenInfo.availWidth }}px</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.screen.colorDepth') }}</span>
          </template>
          <el-tag>{{ screenInfo.colorDepth }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="font-bold">{{ i18n.t('home.screen.pixelDepth') }}</span>
          </template>
          <el-tag>{{ screenInfo.pixelDepth }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedScreenOrientation">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.screen.type') }}</span>
          </template>
          <el-tag>{{ type }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item v-if="isSupportedScreenOrientation">
          <template #label>
            <span class="font-bold">{{ i18n.t('home.screen.angel') }}</span>
          </template>
          <el-tag>{{ angel }}</el-tag>
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
          <el-link type="primary" :href="PROJECT_AUTHOR_HOME_PAGE" target="_blank" :underline="false">{{ PROJECT_AUTHOR_HOME_PAGE }}</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
