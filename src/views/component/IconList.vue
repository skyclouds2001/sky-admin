<script setup lang="ts">
import { ElSpace } from 'element-plus'
import * as icons from '@element-plus/icons-vue'
import IconItem from '@/components/component/IconItem'
</script>

<template>
  <el-space class="p-5" size="large" wrap>
    <icon-item v-for="[key, component] of Object.entries(icons)" :key="key" :icon="component" />
  </el-space>
</template>

<style scoped lang="scss"></style>
