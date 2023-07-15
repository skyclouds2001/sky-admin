<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCard, ElSpace } from 'element-plus'
import { BoxGeometry, CapsuleGeometry, CircleGeometry, ConeGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

const geometry = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const animation = (time: number): void => {
    box.rotation.x = time / 1000
    box.rotation.y = time / 1000
    capsule.rotation.x = time / 1000
    capsule.rotation.y = time / 1000
    circle.rotation.x = time / 1000
    circle.rotation.y = time / 1000
    cone.rotation.x = time / 1000
    cone.rotation.y = time / 1000

    renderer.render(scene, camera)
  }

  if (geometry.value === null) return

  const camera = new PerspectiveCamera(70, 800 / 400, 1, 100)
  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()

  const box = new Mesh(new BoxGeometry(1, 1, 1, 2, 2, 2), new MeshBasicMaterial({ color: 0x00ff00 }))
  box.position.set(10, 0, 0)
  scene.add(box)

  const capsule = new Mesh(new CapsuleGeometry(1, 2, 8, 8), new MeshBasicMaterial({ color: 0xffff00 }))
  capsule.position.set(-10, 0, 0)
  scene.add(capsule)

  const circle = new Mesh(new CircleGeometry(1, 32, 0, Math.PI), new MeshBasicMaterial({ color: 0xff0000 }))
  circle.position.set(0, 5, 0)
  scene.add(circle)

  const cone = new Mesh(new ConeGeometry(1.5, 2, 12, 12, false, 0, Math.PI), new MeshBasicMaterial({ color: 0x0000ff }))
  cone.position.set(0, -5, 0)
  scene.add(cone)

  const renderer = new WebGLRenderer({ canvas: geometry.value })
  renderer.setSize(800, 400)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setAnimationLoop(animation)
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <canvas ref="geometry" width="800" height="400" style="width: 800px; height: 400px"></canvas>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
