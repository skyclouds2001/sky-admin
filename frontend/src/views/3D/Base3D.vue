<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCard, ElSpace } from 'element-plus'
import * as THREE from 'three'

const demo = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animation = (time: number): void => {
    mesh.rotation.x = time / 2000
    mesh.rotation.y = time / 1000

    renderer.render(scene, camera)
  }

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(70, 800 / 600, 0.2, 10)
  camera.position.z = 1

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshNormalMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(1000, 1000)
  renderer.setAnimationLoop(animation)

  demo.value?.appendChild(renderer.domElement)
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <div ref="demo" style="width: 800px; height: 600px"></div>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
