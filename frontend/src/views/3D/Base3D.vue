<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCard, ElSpace } from 'element-plus'
import * as THREE from 'three'
// @ts-expect-error can not find type definition for this file
import WebGL from 'three/addons/capabilities/WebGL.js'

const demo = ref<HTMLDivElement | null>(null)

const line = ref<HTMLDivElement | null>(null)

const df = (): void => {
  const animation = (time: number): void => {
    mesh.rotation.x = time / 2000
    mesh.rotation.y = time / 1000

    renderer.render(scene, camera)
  }

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(70, 800 / 400, 0.2, 5)
  camera.position.z = 0.5

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshNormalMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(800, 400)
  renderer.setAnimationLoop(animation)

  demo.value?.appendChild(renderer.domElement)
}

const lf = (): void => {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, 800 / 400, 1, 500)
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0), new THREE.Vector3(10, 0, 0)])
  const material = new THREE.LineBasicMaterial({ color: 0xffffff })
  const lin = new THREE.Line(geometry, material)
  scene.add(lin)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(800, 400)
  renderer.render(scene, camera)

  line.value?.appendChild(renderer.domElement)
}

onMounted(() => {
  df()
  lf()
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <div>WebGL - {{ WebGL.isWebGLAvailable() ? 'Support' : 'UnSupport' }}</div>
    </el-card>
    <el-card shadow="always">
      <div ref="demo" style="width: 800px; height: 400px"></div>
    </el-card>
    <el-card shadow="always">
      <div ref="line" style="width: 800px; height: 400px"></div>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
