<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animation = (time: number) => {
    mesh.rotation.x = time / 2000
    mesh.rotation.y = time / 1000

    renderer.render(scene, camera)
  }

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.2, 10)
  camera.position.z = 1

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshNormalMaterial()

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(animation)

  el.value?.appendChild(renderer.domElement)
})
</script>

<template>
  <div ref="el"></div>
</template>

<style scoped lang="scss"></style>
