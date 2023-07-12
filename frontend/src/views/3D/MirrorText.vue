<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCard, ElSpace } from 'element-plus'
import * as THREE from 'three'
// @ts-expect-error can not find type definition for this file
import { FontLoader } from 'three/addons/loaders/FontLoader'
// @ts-expect-error can not find type definition for this file
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
import { useEventListener } from '@sky-fly/shooks'
import { optimer_regular } from '@/assets'

const el = ref<HTMLDivElement | null>(null)

THREE.Cache.enabled = true

const tf = (): void => {
  if (el.value === null) return

  const render = (): void => {
    group.rotation.y += (target - group.rotation.y) * 0.05

    renderer.render(scene, camera)
  }

  const camera = new THREE.PerspectiveCamera(30, 800 / 400, 1, 1500)
  camera.position.set(0, 400, 700)
  camera.lookAt(new THREE.Vector3(0, 150, 0))

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  scene.fog = new THREE.Fog(0x000000, 250, 1400)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
  directionalLight.position.set(0, 0, 1).normalize()
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0)
  pointLight.color.setHSL(Math.random(), 1, 0.5)
  pointLight.position.set(0, 100, 90)
  scene.add(pointLight)

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true }))
  plane.position.y = 100
  plane.position.x = -Math.PI / 2
  scene.add(plane)

  const group = new THREE.Group()
  group.position.y = 100
  scene.add(group)

  const materials = [new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), new THREE.MeshPhongMaterial({ color: 0xffffff })]

  let text = 'Hello World'
  let textMesh1: THREE.Mesh
  let textMesh2: THREE.Mesh
  let font: unknown

  new FontLoader().load(
    optimer_regular,
    (result: unknown) => {
      font = result

      renderText()
    },
    (event: ProgressEvent) => {
      console.log((event.loaded / event.total) * 100)
    },
    (error: unknown) => {
      console.error(error)
    }
  )

  const renderText = (): void => {
    const textGeometry = new TextGeometry(text, {
      font,
      size: 70,
      height: 20,
      curveSegments: 4,
      bevelThickness: 2,
      bevelSize: 1.5,
      bevelEnabled: true,
    })
    textGeometry.computeBoundingBox()

    const center = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x)

    textMesh1 = new THREE.Mesh(textGeometry, materials)
    textMesh1.position.set(center, 30, 0)
    textMesh1.rotation.set(0, 2 * Math.PI, 0)
    group.add(textMesh1)

    textMesh2 = new THREE.Mesh(textGeometry, materials)
    textMesh2.position.set(center, -30, 0)
    textMesh2.rotation.set(Math.PI, 2 * Math.PI, 0)
    group.add(textMesh2)
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(800, 400)
  renderer.setAnimationLoop(render)
  renderer.useLegacyLights = false
  el.value.appendChild(renderer.domElement)

  el.value.style.touchAction = 'none'

  useEventListener(window, 'keydown', (e) => {
    if (e.key === 'Backspace') {
      text = text.slice(0, -1)
    } else {
      text += e.key
    }

    group.clear()

    if (text.length === 0) return

    renderText()
  })

  let target = 0

  useEventListener(el.value, 'pointerdown', (e: PointerEvent) => {
    if (!e.isPrimary) return

    const pos = e.clientX - 800 / 2
    const rawTarget = target

    const move = (e: PointerEvent): void => {
      if (!e.isPrimary) return

      target = rawTarget + (e.clientX - 800 / 2 - pos) * 0.02
    }

    const stop = (): void => {
      el.value?.removeEventListener('pointermove', move)
      el.value?.removeEventListener('pointerup', stop)
    }

    el.value?.addEventListener('pointermove', move, { passive: true })
    el.value?.addEventListener('pointerup', stop, { passive: true })
  })
}

onMounted(() => {
  tf()
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <div ref="el" style="width: 800px; height: 400px"></div>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
