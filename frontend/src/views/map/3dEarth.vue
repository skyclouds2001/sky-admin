<script setup lang="ts">
import { Camera, CameraEventType, Ion, Rectangle, Viewer } from 'cesium'
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'
import { onMounted, onUnmounted, ref } from 'vue'

const el = ref<HTMLDivElement | null>(null)

let viewer: Viewer

window.CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/'

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YmRhMzFkYS1hMTI5LTQ2ZjEtODk3ZS0yNDFlYmNkYzk3OGMiLCJpZCI6MTc4OTM4LCJpYXQiOjE3MDAxOTYyNTB9.XmsCEAlfbOR7RqNm2zpp4qCuVkYdaBjsSXbrjcjSJew'

onMounted(() => {
  // set camera to view China on initial
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(75.0, 0.0, 140.0, 60.0)

  viewer = new Viewer(el.value as HTMLDivElement, {
    fullscreenElement: el.value as HTMLDivElement,
  })

  // remove credit information
  const credit = viewer.cesiumWidget.creditContainer as HTMLElement
  credit.style.display = 'none'

  // show frame per second for debug
  viewer.scene.debugShowFramesPerSecond = import.meta.env.DEV

  // add sunshine support
  viewer.scene.globe.enableLighting = true

  // depth-tested against the terrain surface, so to disable drag into the inner side of the earth
  viewer.scene.globe.depthTestAgainstTerrain = true

  viewer.scene.screenSpaceCameraController.tiltEventTypes = CameraEventType.RIGHT_DRAG
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
