<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElButton, ElResult } from 'element-plus'

const router = useRouter()

const i18n = useI18n()

/**
 * 返回首页方法
 */
const redirect = (): void => {
  void router.push('/')
}
</script>

<template>
  <el-result icon="error" title="403" :sub-title="i18n.t('error.403')">
    <template #extra>
      <el-button type="primary" @click="redirect">{{ i18n.t('error.redirect') }}</el-button>
    </template>
  </el-result>
</template>

<style scoped lang="scss"></style>
