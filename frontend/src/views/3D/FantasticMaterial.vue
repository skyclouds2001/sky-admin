<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { useEventListener } from '@sky-fly/shooks'
import { pisa } from '@/assets'

const container = ref<HTMLDivElement | null>(null)

const params = {
  envMap: 'Reflection',
  roughness: 0,
  metalness: 0,
  exposure: 1,
}

onMounted(() => {
  if (container.value === null) return

  if (!WebGL.isWebGLAvailable()) {
    container.value.appendChild(WebGL.getWebGLErrorMessage())
    return
  }

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

  const scene = new THREE.Scene()
  scene.name = 'Scene'
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.Fog(0x000000, 10, 25)

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100)
  camera.name = 'PerspectiveCamera'
  camera.position.set(10, 5, 10)
  camera.up.set(0, 1, 0)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  })
  renderer.setAnimationLoop(animate)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = params.exposure

  container.value.appendChild(renderer.domElement)

  const helper = new THREE.AxesHelper(100)
  scene.add(helper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 1.5
  controls.maxDistance = 10

  const onResize = (): void => {
    if (container.value === null) return

    const { width: w, height: h } = container.value.getBoundingClientRect()

    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.render(scene, camera)

    width = w
    height = h
  }

  useEventListener(window, 'resize', onResize, {
    passive: true,
  })

  useEventListener(window, 'orientationchange', onResize, {
    passive: true,
  })

  const manager = new THREE.LoadingManager(() => {
    roughMetalBallMaterial.envMap = generator.fromCubemap(cubeMap).texture
  })

  const generator = new THREE.PMREMGenerator(renderer)
  generator.compileCubemapShader()

  const urls = [pisa.px, pisa.nx, pisa.py, pisa.ny, pisa.pz, pisa.nz]
  const loader = new THREE.CubeTextureLoader(manager)
  const cubeMap = loader.load(urls.map((url) => new URL(url, import.meta.url).href))

  scene.background = cubeMap

  const envBallMap = cubeMap.clone()
  envBallMap.mapping = THREE.CubeReflectionMapping
  const envBallGeometry = new THREE.IcosahedronGeometry(1, 15)
  const envBallMaterial = new THREE.MeshBasicMaterial({
    envMap: envBallMap,
  })
  const envBall = new THREE.Mesh(envBallGeometry, envBallMaterial)
  envBall.position.set(0, 0, 0)
  scene.add(envBall)

  const roughMetalBallGeometry = new THREE.TorusKnotGeometry(1, 0.5, 150, 20)
  const roughMetalBallMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0,
    metalness: 0,
    envMapIntensity: 1.0,
  })
  const roughMetalBall = new THREE.Mesh(roughMetalBallGeometry, roughMetalBallMaterial)
  roughMetalBall.position.set(0, 3, 0)
  scene.add(roughMetalBall)

  const clock = new THREE.Clock()

  const render = (): void => {
    const time = clock.getElapsedTime()

    envBall.position.x = 3 * Math.sin(time * 0.5)
    envBall.position.z = 1 * Math.sin(time)
    roughMetalBall.rotation.y = time * 0.2
  }

  const gui = new GUI()
  const envBallFolder = gui.addFolder('envBall')
  envBallFolder.add(params, 'envMap', ['Reflection', 'Refraction']).onChange((envmap: string) => {
    switch (envmap) {
      case 'Reflection':
        envBallMap.mapping = THREE.CubeReflectionMapping
        break
      case 'Refraction':
        envBallMap.mapping = THREE.CubeRefractionMapping
        break
    }
    envBallMaterial.needsUpdate = true
  })
  const roughMetalBallFolder = gui.addFolder('roughMetalBall')
  roughMetalBallFolder.add(params, 'roughness', 0, 1, 0.01).onChange((roughness: number) => {
    roughMetalBallMaterial.roughness = roughness
  })
  roughMetalBallFolder.add(params, 'metalness', 0, 1, 0.01).onChange((metalness: number) => {
    roughMetalBallMaterial.metalness = metalness
  })
  roughMetalBallFolder.add(params, 'exposure', 0, 2, 0.01).onChange((exposure: number) => {
    renderer.toneMappingExposure = exposure
  })
  gui.open()
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
