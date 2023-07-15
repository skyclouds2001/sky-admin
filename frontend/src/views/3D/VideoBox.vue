<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCard, ElSpace } from 'element-plus'

const video = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  //
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <canvas ref="video" width="1000" height="600" style="width: 1000px; height: 600px"></canvas>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
