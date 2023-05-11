<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ElIcon } from 'element-plus'
import { RefreshRight } from '@element-plus/icons-vue'
import { useEventListener } from '@/hook'

const el = ref<HTMLDivElement | null>(null)

const isActive = ref(false)

const rotate = ref(0)

const center = {
  x: 0,
  y: 0,
}

useEventListener(window, 'mousedown', (e) => {
  if (!isActive.value && (e.target as SVGSVGElement).tagName === 'svg') {
    isActive.value = true
  }
})

useEventListener(window, 'mousemove', (e) => {
  if (isActive.value) {
    rotate.value = (Math.atan2(center.y - e.clientY, center.x - e.clientX) * 180) / Math.PI - 90
  }
})

useEventListener(window, 'mouseup', () => {
  if (isActive.value) {
    isActive.value = false
  }
})

onMounted(() => {
  if (!el.value) return

  const rect = el.value.getBoundingClientRect()
  center.x = rect.left + rect.width / 2
  center.y = rect.top + rect.height / 2
})

onBeforeUnmount(() => {
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
