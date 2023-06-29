<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useEventListener } from '@skyclouds2001/vhooks'

const isActive = ref(false)

const position = reactive({
  top: '80px',
  left: '-80px',
})

useEventListener(window, 'mousedown', (e) => {
  if ((e.target as HTMLDivElement).classList.contains('draggable-item') && !isActive.value) {
    isActive.value = true
  }
})

useEventListener(window, 'mousemove', (e) => {
  if (isActive.value) {
    position.left = `${parseInt(position.left) + e.movementX}px`
    position.top = `${parseInt(position.top) + e.movementY}px`
  }
})

useEventListener(window, 'mouseup', () => {
  if (isActive.value) {
    isActive.value = false
  }
})
</script>

<template>
  <div class="draggable-box">
    <div :class="['draggable-item', isActive ? 'active' : '']" :style="position">draggable component</div>
  </div>
</template>

<style scoped lang="scss">
.draggable-box {
  @apply relative;

  .draggable-item {
    @apply w-40 h-40;
    @apply absolute z-[999] top-20 -left-20;
    @apply flex justify-center items-center;
    @apply shadow-xl border border-blue-600;
    @apply cursor-grab;

    &.active {
      @apply cursor-grabbing;
    }
  }
}
</style>
