<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'

const isActive = ref(false)

const position = reactive({
  top: '80px',
  left: '-80px',
})

const handleMouseDown = (e: MouseEvent) => {
  if ((e.target as HTMLDivElement).classList.contains('draggable-item') && !isActive.value) {
    isActive.value = true
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (isActive.value) {
    position.left = `${parseInt(position.left) + e.movementX}px`
    position.top = `${parseInt(position.top) + e.movementY}px`
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
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
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
