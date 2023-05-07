<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useEventListener } from '@/hook'

const current = ref(0)

const box = reactive({
  width: '160px',
  height: '160px',
  top: '80px',
  left: '-80px',
})

useEventListener(window, 'mousedown', (e) => {
  const {
    localName: name,
    dataset: { id },
  } = e.target
  if (current.value === 0 && name === 'i' && id) {
    current.value = parseInt(id)
  }
})

useEventListener(window, 'mousemove', (e) => {
  if (current.value !== 0) {
    switch (current.value) {
      case 1:
        box.width = `${parseInt(box.width) - e.movementX}px`
        box.height = `${parseInt(box.height) - e.movementY}px`
        box.left = `${parseInt(box.left) + e.movementX}px`
        box.top = `${parseInt(box.top) + e.movementY}px`
        break
      case 2:
        box.width = `${parseInt(box.width) + e.movementX * 2}px`
        box.height = `${parseInt(box.height) - e.movementY}px`
        box.top = `${parseInt(box.top) + e.movementY}px`
        break
      case 3:
        box.width = `${parseInt(box.width) + e.movementX}px`
        box.height = `${parseInt(box.height) - e.movementY}px`
        box.top = `${parseInt(box.top) + e.movementY}px`
        break
      case 4:
        box.width = `${parseInt(box.width) + e.movementX}px`
        box.height = `${parseInt(box.height) + e.movementY * 2}px`
        break
      case 5:
        box.width = `${parseInt(box.width) + e.movementX}px`
        box.height = `${parseInt(box.height) + e.movementY}px`
        break
      case 6:
        box.width = `${parseInt(box.width) + e.movementX * 2}px`
        box.height = `${parseInt(box.height) + e.movementY}px`
        break
      case 7:
        box.width = `${parseInt(box.width) - e.movementX}px`
        box.height = `${parseInt(box.height) + e.movementY}px`
        box.left = `${parseInt(box.left) + e.movementX}px`
        break
      case 8:
        box.width = `${parseInt(box.width) - e.movementX}px`
        box.height = `${parseInt(box.height) + e.movementY * 2}px`
        box.left = `${parseInt(box.left) + e.movementX}px`
        break
    }
  }
})

useEventListener(window, 'mouseup', () => {
  if (current.value !== 0) {
    current.value = 0
  }
})
</script>

<template>
  <div class="scalable-box">
    <div class="scalable-item" :style="box">
      <span>scalable component</span>
      <i data-id="1"></i>
      <i data-id="2"></i>
      <i data-id="3"></i>
      <i data-id="4"></i>
      <i data-id="5"></i>
      <i data-id="6"></i>
      <i data-id="7"></i>
      <i data-id="8"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scalable-box {
  @apply relative;

  .scalable-item {
    @apply w-40 h-40;
    @apply absolute z-[999] top-20 -left-20;
    @apply flex justify-center items-center;
    @apply shadow-xl border border-blue-600;

    i {
      @apply absolute;
      @apply w-2 h-2 rounded-full;
      @apply -translate-x-1/2 -translate-y-1/2;
      @apply bg-blue-600;
    }

    i:nth-of-type(1) {
      @apply top-0 left-0;
      @apply cursor-nwse-resize;
    }

    i:nth-of-type(2) {
      @apply top-0 left-1/2;
      @apply cursor-ns-resize;
    }

    i:nth-of-type(3) {
      @apply top-0 left-full;
      @apply cursor-nesw-resize;
    }

    i:nth-of-type(4) {
      @apply top-1/2 left-full;
      @apply cursor-ew-resize;
    }

    i:nth-of-type(5) {
      @apply top-full left-full;
      @apply cursor-nwse-resize;
    }

    i:nth-of-type(6) {
      @apply top-full left-1/2;
      @apply cursor-ns-resize;
    }

    i:nth-of-type(7) {
      @apply top-full left-0;
      @apply cursor-nesw-resize;
    }

    i:nth-of-type(8) {
      @apply top-1/2 left-0;
      @apply cursor-ew-resize;
    }
  }
}
</style>
