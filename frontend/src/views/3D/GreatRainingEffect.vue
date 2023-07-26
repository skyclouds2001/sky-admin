<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AxesHelper, CanvasTexture, ClampToEdgeWrapping, Color, DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, Vector3, WebGLRenderer } from 'three'
// @ts-expect-error can not find type definition for this file
import Stats from 'three/addons/libs/stats.module'
// @ts-expect-error can not find type definition for this file
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise'
// @ts-expect-error can not find type definition for this file
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const render = (): void => {
    controls.update()
    stats.update()
    renderer.render(scene, camera)
  }

  if (container.value === null) return

  const { width, height } = container.value.getBoundingClientRect()

  const stats = new Stats()
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.top = '0'
  stats.domElement.style.left = '0'
  container.value.appendChild(stats.domElement)

  const camera = new PerspectiveCamera(45, width / height, 1, 150000)
  camera.position.set(10000, 10000, 10000)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()
  scene.background = new Color(0x333333)

  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(render)

  container.value.appendChild(renderer.domElement)

  const axes = new AxesHelper()
  scene.add(axes)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = true
  controls.autoRotate = false
  controls.enablePan = true

  const noise = new ImprovedNoise()
  const data = new Uint8Array(256 * 256)
  for (let j = 0, k = Math.random() * 100, quality = 1; j < 4; ++j, quality *= 5) {
    for (let i = 0; i < 256 * 256; ++i) {
      // eslint-disable-next-line security/detect-object-injection
      data[i] += Math.abs(noise.noise((i % 256) / quality, ~~(i / 256) / quality, k) * quality * 1.75)
    }
  }

  const geometry = new PlaneGeometry(7500, 7500, 255, 255)
  geometry.rotateX(-Math.PI / 2)

  const vertices = geometry.attributes.position.array
  for (let i = 0, j = 0, l = vertices.length; i < l; ++i, j += 3) {
    // eslint-disable-next-line security/detect-object-injection
    vertices[j + 1] = data[i] * 10
  }

  const vector = new Vector3(0, 0, 0)
  const sun = new Vector3(1, 1, 1).normalize()

  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (context === null) return
  context.fillStyle = '#000'
  context.fillRect(0, 0, 256, 256)

  const image = context.getImageData(0, 0, canvas.width, canvas.height)
  const imageData = image.data

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, ++j) {
    vector.x = data[j - 2] - data[j + 2]
    vector.y = 2
    vector.z = data[j - 256 * 2] - data[j + 256 * 2]
    vector.normalize()

    const shade = vector.dot(sun)

    // eslint-disable-next-line security/detect-object-injection
    imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007)
    // eslint-disable-next-line security/detect-object-injection
    imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007)
    // eslint-disable-next-line security/detect-object-injection
    imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007)
  }

  context.putImageData(image, 0, 0)

  const canva = document.createElement('canvas')
  canva.width = 256 * 4
  canva.height = 256 * 4

  const contex = canva.getContext('2d')
  if (contex === null) return
  contex.scale(4, 4)
  contex.drawImage(canvas, 0, 0)

  const imag = contex.getImageData(0, 0, canva.width, canva.height)
  const imagDat = imag.data

  for (let i = 0, l = imagDat.length; i < l; i += 4) {
    const v = ~~(Math.random() * 5)

    // eslint-disable-next-line security/detect-object-injection
    imagDat[i] += v
    imagDat[i + 1] += v
    imagDat[i + 2] += v
  }

  contex.putImageData(imag, 0, 0)

  const texture = new CanvasTexture(canva)
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping

  const mesh = new Mesh(
    geometry,
    new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    })
  )
  scene.add(mesh)

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
