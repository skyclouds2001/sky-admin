<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ElIcon } from 'element-plus'
import { RefreshRight } from '@element-plus/icons-vue'

const el = ref<HTMLDivElement | null>(null)

const isActive = ref(false)

const rotate = ref(0)

const center = {
  x: 0,
  y: 0,
}

const handleMouseDown = (e: MouseEvent) => {
  if (!isActive.value && (e.target as SVGSVGElement).tagName === 'svg') {
    isActive.value = true
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (isActive.value) {
    rotate.value = (Math.atan2(center.y - e.clientY, center.x - e.clientX) * 180) / Math.PI - 90
  }
}

const handleMouseUp = () => {
  if (isActive.value) {
    isActive.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)

  const rect = el.value.getBoundingClientRect()
  center.x = rect.left + rect.width / 2
  center.y = rect.top + rect.height / 2
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)

  center.x = 0
  center.y = 0
})
</script>

<template>
  <div class="rotatable-box">
    <div ref="el" class="rotatable-item" :style="{ rotate: `${rotate}deg` }">
      <span>rotatable component</span>
      <el-icon class="icon" color="#2563EB">
        <RefreshRight />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rotatable-box {
  @apply relative;

  .rotatable-item {
    @apply w-40 h-40;
    @apply absolute z-[999] top-20 -left-20;
    @apply flex justify-center items-center;
    @apply shadow-xl border border-blue-600;

    .icon {
      @apply absolute -top-[1.25em];
      @apply cursor-grabbing;
    }
  }
}
</style>
