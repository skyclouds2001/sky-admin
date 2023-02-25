<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { ElDrawer } from 'element-plus'

const isShowSettingDrawer = inject<Ref<boolean>>('setting')
</script>

<template>
  <el-drawer v-model="isShowSettingDrawer" size="20%">
    <template #header>
      <h1 class="text-base font-bold text-black">设置</h1>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
