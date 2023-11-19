<script setup lang="ts">
import { Ion, Viewer } from 'cesium'
import { ref, onMounted, onUnmounted } from 'vue'
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'

const el = ref<HTMLDivElement | null>(null)

let viewer: Viewer

window.CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/'

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YmRhMzFkYS1hMTI5LTQ2ZjEtODk3ZS0yNDFlYmNkYzk3OGMiLCJpZCI6MTc4OTM4LCJpYXQiOjE3MDAxOTYyNTB9.XmsCEAlfbOR7RqNm2zpp4qCuVkYdaBjsSXbrjcjSJew'

onMounted(() => {
  viewer = new Viewer(el.value as HTMLDivElement, {
    fullscreenElement: el.value as HTMLDivElement,
  })

  // remove credit information
  const credit = viewer.cesiumWidget.creditContainer as HTMLElement
  credit.style.display = 'none'

  // add sunshine support
})

onUnmounted(() => {
  viewer.destroy()
})
</script>

<template>
  <div ref="el" class="earth"></div>
</template>

<style scoped lang="scss">
.earth {
  width: 100%;
  height: 100%;
}

:global(:has(> .earth)) {
  width: 100%;
  height: 100%;
}
</style>
