<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AdditiveBlending, AmbientLight, BufferAttribute, BufferGeometry, Color, DoubleSide, Fog, Group, LoadingManager, Mesh, MeshPhongMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, SphereGeometry, TextureLoader, WebGLRenderer } from 'three'
// @ts-expect-error can not find type definition for this file
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { useEventListener } from '@sky-fly/shooks'
import { earth_bump, earth_cloud, earth_spec, earth, star } from '@/assets'

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
  const group = new Group()

  const starGeometry = new BufferGeometry()

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

  starGeometry.setAttribute('position', new BufferAttribute(vertices, 3))
  starGeometry.setAttribute('color', new BufferAttribute(colors, 3))

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

  const stars = new Points(starGeometry, starMaterial)
  scene.add(stars)

  const earthGroup = new Group()

  const earthGeometry = new SphereGeometry(5, 32, 32)
  const earthTexture = textureLoader.load(new URL(earth, import.meta.url).href)
  const earthBumpTexture = textureLoader.load(new URL(earth_bump, import.meta.url).href)
  const earthSpecTexture = textureLoader.load(new URL(earth_spec, import.meta.url).href)
  const earthMaterial = new MeshPhongMaterial({
    map: earthTexture,
    bumpMap: earthBumpTexture,
    bumpScale: 0.15,
    specularMap: earthSpecTexture,
    specular: new Color('#909090'),
    shininess: 5,
    transparent: true,
    side: DoubleSide,
  })
  const earthMesh = new Mesh(earthGeometry, earthMaterial)
  earthGroup.add(earthMesh)

  const cloudGeometry = new SphereGeometry(5.1, 40, 40)
  const cloudTexture = textureLoader.load(new URL(earth_cloud, import.meta.url).href)
  const cloudMaterial = new MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 1,
    blending: AdditiveBlending,
    side: DoubleSide,
  })
  const cloudMesh = new Mesh(cloudGeometry, cloudMaterial)
  earthGroup.add(cloudMesh)

  earthGroup.rotation.set(0.5, 0, -0.4)

  group.add(earthGroup)

  scene.add(group)

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
