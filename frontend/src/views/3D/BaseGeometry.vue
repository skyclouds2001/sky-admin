<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCard, ElSpace } from 'element-plus'
import {} from 'three'

const geometry = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  //
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <canvas ref="geometry" width="800" height="400" style="width: 800px; height: 400px"></canvas>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
