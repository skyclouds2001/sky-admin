<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmbientLight, Color, CubeTextureLoader, DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { useEventListener } from '@sky-fly/shooks'
import { nx, ny, nz, px, py, pz } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

const cameraPosition = new Vector3(0, -13, 48)

onMounted(() => {
  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.copy(cameraPosition)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()
  scene.background = new CubeTextureLoader().load([px, nx, py, ny, pz, nz].map((path) => new URL(path, import.meta.url).href))

  const ambientLight = new AmbientLight(new Color(255, 255, 255))
  scene.add(ambientLight)

  const directionLight = new DirectionalLight(new Color(255, 99, 71), 2)
  directionLight.position.set(-220, 30, 50)
  scene.add(directionLight)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(width, height)
  container.value.appendChild(renderer.domElement)

  renderer.render(scene, camera)

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()
    renderer.setSize(width, height)

    renderer.render(scene, camera)
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
