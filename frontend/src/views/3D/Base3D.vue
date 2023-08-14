<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AxesHelper, BoxGeometry, Color, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (container.value === null) return

  if (!WebGL.isWebGLAvailable()) return container.value.appendChild(WebGL.getWebGLErrorMessage())

  const animate = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)

    render()
  }

  let { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0'
  stats.dom.style.left = '0'
  container.value.appendChild(stats.dom)

  const scene = new Scene()
  scene.name = 'Scene'
  scene.background = new Color(0x000000)

  const camera = new PerspectiveCamera(70, width / height, 0.2, 10)
  camera.name = 'PerspectiveCamera'
  camera.position.set(0.5, 0.5, 0.5)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  container.value.appendChild(renderer.domElement)

  const helper = new AxesHelper(20)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const onResize = (): void => {
    if (container.value === null) return

    const rect = container.value.getBoundingClientRect()
    width = rect.width
    height = rect.height

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.render(scene, camera)
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const geometry = new BoxGeometry(0.2, 0.2, 0.2)
  geometry.name = 'BoxGeometry'
  const material = new MeshNormalMaterial()
  material.name = 'MeshNormalMaterial'
  const mesh = new Mesh(geometry, material)
  mesh.name = 'Mesh'
  scene.add(mesh)

  const render = (): void => {
    const time = Date.now()

    mesh.rotation.x = time / 2000
    mesh.rotation.y = time / 1000
  }
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
