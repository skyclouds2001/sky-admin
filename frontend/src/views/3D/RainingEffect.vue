<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, WebGLRenderer } from 'three'
// @ts-expect-error can not find type definition for this file
import Stats from 'three/addons/libs/stats.module'
// @ts-expect-error can not find type definition for this file
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'
import { rain } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const render = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)

    const p = points.geometry.getAttribute('position').array as Float32Array
    p.forEach((v, i) => {
      if (i % 3 === 1) {
        // eslint-disable-next-line security/detect-object-injection
        p[i] -= Math.random() * 0.5
        if (v < -40) {
          // eslint-disable-next-line security/detect-object-injection
          p[i] = 40
        }
      }
    })
    points.geometry.getAttribute('position').needsUpdate = true
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.top = '0'
  stats.domElement.style.left = '0'
  container.value.appendChild(stats.domElement)

  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.set(0, 0, 40)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()
  scene.background = new Color(0x000000)

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

  const POINT_COUNT = 1000

  const geometry = new BufferGeometry()
  const positions = new Float32Array(POINT_COUNT * 3).fill(0).map(() => (Math.random() - 0.5) * 100)
  geometry.setAttribute('position', new BufferAttribute(positions, 3))

  const texture = new TextureLoader()
  const rainTexture = texture.load(rain)

  const material = new PointsMaterial({
    size: 1,
    transparent: true,
    opacity: 0.5,
    vertexColors: false,
    sizeAttenuation: true,
    color: 0xededed,
    depthTest: true,
    depthWrite: false,
    map: rainTexture,
    alphaMap: rainTexture,
    blending: AdditiveBlending,
  })

  const points = new Points(geometry, material)
  scene.add(points)

  useEventListener(window, 'resize', () => {
    if (container.value === null) return

    const { width, height } = container.value.getBoundingClientRect()

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
  })

  useEventListener(window, 'orientationchange', () => {
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
  position: relative;
  width: 100%;
  height: calc(100vh - 60px - 40px - 60px);
}
</style>
