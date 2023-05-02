<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'

const el = ref<HTMLDivElement | null>(null)

const isActive = ref(false)

const position = reactive({
  top: 40,
  left: -40,
})

const handleMouseDown = () => {
  if (!isActive.value) {
    isActive.value = true
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (isActive.value) {
    position.left = position.left + e.movementX
    position.top = position.top + e.movementY
  }
}

const handleMouseUp = () => {
  if (isActive.value) {
    isActive.value = false
  }
}

onMounted(() => {
  el.value?.addEventListener('mousedown', handleMouseDown)
  el.value?.addEventListener('mousemove', handleMouseMove)
  el.value?.addEventListener('mouseup', handleMouseUp)
})

onBeforeUnmount(() => {
  el.value?.removeEventListener('mousedown', handleMouseDown)
  el.value?.removeEventListener('mousemove', handleMouseMove)
  el.value?.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div class="draggable-box">
    <div ref="el" :class="['draggable-item', isActive ? 'active' : '']" :style="{ top: `${position.top}px`, left: `${position.left}px` }">draggable component</div>
  </div>
</template>

<style scoped lang="scss">
.draggable-box {
  @apply relative;

  .draggable-item {
    @apply w-40 h-40;
    @apply absolute z-[999] top-10 -left-10;
    @apply shadow-xl;
    @apply cursor-grab;

    &.active {
      @apply cursor-grabbing;
    }
  }
}
</style>
