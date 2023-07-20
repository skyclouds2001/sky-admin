<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AmbientLight, Color, CubeTextureLoader, DirectionalLight, Euler, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
// @ts-expect-error can not find type definition for this file
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader'
// @ts-expect-error can not find type definition for this file
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { useEventListener } from '@sky-fly/shooks'
import { building, nx, ny, nz, px, py, pz } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

const skyMaps = [px, nx, py, ny, pz, nz].map((path) => new URL(path, import.meta.url).href)

const cameraPosition = new Vector3(0, -13, 48)

const modalPosition = new Vector3(14, -40.8, 0)

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
dracoLoader.preload()

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(gltfLoader)

onMounted(() => {
  if (container.value === null) return

  const animate = (): void => {
    renderer.render(scene, camera)
  }

  const { width, height } = container.value.getBoundingClientRect()

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.copy(cameraPosition)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()
  scene.background = new CubeTextureLoader().load(skyMaps)

  const ambientLight = new AmbientLight(new Color(255, 255, 255))
  scene.add(ambientLight)

  const directionLight = new DirectionalLight(new Color(255, 99, 71), 2)
  directionLight.position.set(-220, 30, 50)
  scene.add(directionLight)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setSize(width, height)
  renderer.setAnimationLoop(animate)

  container.value.appendChild(renderer.domElement)

  gltfLoader.load(new URL(building, import.meta.url).href, (modal: any) => {
    console.log({ ...modal })
    modal.scene.position.copy(modalPosition)

    const r: Euler = modal.scene.rotation.clone()
    modal.scene.rotation.copy(new Euler(r.x, r.y - (131 * Math.PI) / 180, r.z, r.order))

    scene.add(modal.scene)
  })

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
