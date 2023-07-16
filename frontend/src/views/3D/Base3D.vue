<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCard, ElSpace } from 'element-plus'
import { BoxGeometry, BufferGeometry, DirectionalLight, Line, LineBasicMaterial, Mesh, MeshNormalMaterial, MeshPhongMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
// @ts-expect-error can not find type definition for this file
import WebGL from 'three/addons/capabilities/WebGL.js'

const demo = ref<HTMLDivElement | null>(null)

const line = ref<HTMLDivElement | null>(null)

const shape = ref<HTMLCanvasElement | null>(null)

const df = (): void => {
  const animation = (time: number): void => {
    mesh.rotation.x = time / 2000
    mesh.rotation.y = time / 1000

    renderer.render(scene, camera)
  }

  const camera = new PerspectiveCamera(70, 800 / 400, 0.2, 5)
  camera.position.z = 0.5

  const scene = new Scene()

  const geometry = new BoxGeometry(0.2, 0.2, 0.2)
  const material = new MeshNormalMaterial()
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(800, 400)
  renderer.setAnimationLoop(animation)

  demo.value?.appendChild(renderer.domElement)
}

const lf = (): void => {
  const camera = new PerspectiveCamera(45, 800 / 400, 1, 500)
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()

  const geometry = new BufferGeometry().setFromPoints([new Vector3(-10, 0, 0), new Vector3(0, 10, 0), new Vector3(10, 0, 0)])
  const material = new LineBasicMaterial({ color: 0xffffff })
  const lin = new Line(geometry, material)
  scene.add(lin)

  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(800, 400)
  renderer.render(scene, camera)

  line.value?.appendChild(renderer.domElement)
}

const mf = (): void => {
  const animate = (time: number): void => {
    cube.rotation.x = time / 1000
    cube.rotation.y = time / 1000

    renderer.render(scene, camera)
  }

  if (shape.value === null) return

  const camera = new PerspectiveCamera(50, 800 / 400, 1, 100)
  camera.position.set(2, 2, 2)
  camera.lookAt(0, 0, 0)

  const scene = new Scene()

  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshPhongMaterial({ color: 0x44aa88 })
  const cube = new Mesh(geometry, material)
  scene.add(cube)

  const light = new DirectionalLight(0xffffff, 1)
  light.position.set(-1, 2, 4)
  scene.add(light)

  const renderer = new WebGLRenderer({ canvas: shape.value, antialias: true })
  renderer.setSize(800, 400)
  renderer.setAnimationLoop(animate)
  renderer.render(scene, camera)
}

onMounted(() => {
  df()
  lf()
  mf()
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
    <el-card shadow="always">
      <canvas ref="shape" width="800" height="400" style="width: 800px; height: 400px"></canvas>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
