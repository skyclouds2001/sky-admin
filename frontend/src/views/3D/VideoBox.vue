<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElCard, ElSpace } from 'element-plus'
import { Group, PerspectiveCamera, Scene } from 'three'
// @ts-expect-error can not find type definition for this file
import { TrackballControls } from 'three/addons/controls/TrackballControls'
// @ts-expect-error can not find type definition for this file
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer'

const video = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const animate = (): void => {
    window.requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  const createElement = (src: string, x: number, y: number, z: number, ry: number): CSS3DObject => {
    const iframe = document.createElement('iframe')
    iframe.style.width = '480px'
    iframe.style.height = '360px'
    iframe.style.zIndex = '9999'
    iframe.width = '480'
    iframe.height = '360'
    iframe.loading = 'lazy'
    iframe.referrerPolicy = 'no-referrer'
    iframe.allowFullscreen = true
    iframe.src = src

    const object = new CSS3DObject(iframe)
    object.position.set(x, y, z)
    object.rotation.y = ry

    return object
  }

  const camera = new PerspectiveCamera(50, 1000 / 600, 1, 5000)
  camera.position.set(500, 350, 750)

  const scene = new Scene()

  const group = new Group()
  group.add(createElement('https://player.bilibili.com/player.html?aid=422093073&bvid=BV1J3411475Q&cid=453689337&page=1', 0, 0, 240, 0))
  group.add(createElement('https://player.bilibili.com/player.html?aid=422093073&bvid=BV1J3411475Q&cid=453689337&page=1', 240, 0, 0, Math.PI / 2))
  group.add(createElement('https://player.bilibili.com/player.html?aid=422093073&bvid=BV1J3411475Q&cid=453689337&page=1', 0, 0, -240, Math.PI))
  group.add(createElement('https://player.bilibili.com/player.html?aid=422093073&bvid=BV1J3411475Q&cid=453689337&page=1', -240, 0, 0, -Math.PI / 2))
  scene.add(group)

  const renderer = new CSS3DRenderer({ element: video.value })
  renderer.setSize(1000, 600)

  const controls = new TrackballControls(camera, renderer.domElement)
  controls.rotateSpeed = 4

  const blocker = document.createElement('div')
  blocker.style.position = 'absolute'
  blocker.style.top = '0'
  blocker.style.right = '0'
  blocker.style.bottom = '0'
  blocker.style.left = '0'
  blocker.style.zIndex = '9999'
  blocker.style.display = 'none'
  document.body.appendChild(blocker)

  controls.addEventListener('start', () => {
    blocker.style.display = 'block'
  })

  controls.addEventListener('end', () => {
    blocker.style.display = 'none'
  })

  animate()
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <div ref="video" style="width: 1000px; height: 600px"></div>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>
