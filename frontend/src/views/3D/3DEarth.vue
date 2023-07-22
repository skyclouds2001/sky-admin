<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const render = (): void => {
    renderer.render(scene, camera)
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)

  const scene = new Scene()

  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(render)

  container.value.appendChild(renderer.domElement)

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
  })
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped lang="scss">
#container {
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
