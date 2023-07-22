<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AdditiveBlending, AmbientLight, BufferAttribute, BufferGeometry, Color, Fog, LoadingManager, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, WebGLRenderer } from 'three'
// @ts-expect-error can not find type definition for this file
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'
import { star } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const render = (): void => {
    renderer.render(scene, camera)
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.set(0, 0, 14)

  const scene = new Scene()
  scene.background = new Color(0x020924)
  scene.fog = new Fog(0x020924, 200, 1000)

  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(render)

  container.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = true
  controls.autoRotate = false
  controls.enablePan = true
  controls.zoomSpeed = 1.8

  const light = new AmbientLight(new Color('rgb(222, 237, 255)'))
  scene.add(light)

  const STAR_NUMBER = 10000

  const manager = new LoadingManager()
  const textureLoader = new TextureLoader(manager)

  const geometry = new BufferGeometry()

  const vertices = new Float32Array(STAR_NUMBER * 3)
  const colors = new Float32Array(STAR_NUMBER * 3)
  for (let i = 0; i < STAR_NUMBER; ++i) {
    vertices[i * 3 + 0] = (Math.random() - 0.5) * 1000
    vertices[i * 3 + 1] = (Math.random() - 0.5) * 1000
    vertices[i * 3 + 2] = (Math.random() - 0.5) * 1000

    const color = new Color()
    color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55)

    colors[i * 3 + 0] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  geometry.setAttribute('position', new BufferAttribute(vertices, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))

  const starTexture = textureLoader.load(new URL(star, import.meta.url).href)
  const starMaterial = new PointsMaterial({
    map: starTexture,
    size: 1,
    transparent: true,
    opacity: 1,
    vertexColors: true,
    depthTest: true,
    depthWrite: true,
    blending: AdditiveBlending,
    sizeAttenuation: true,
  })

  const stars = new Points(geometry, starMaterial)
  scene.add(stars)

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
