<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { renderAsync } from 'docx-preview'
import { DEMO_WORD_SRC } from '@/config'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  fetch(DEMO_WORD_SRC)
    .then((res) => res.blob())
    .then(async (data) => {
      await renderAsync(data, container.value as HTMLDivElement, undefined, {
        debug: import.meta.env.DEV,
        experimental: true,
      })
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <div ref="container" class="word-preview"></div>
</template>

<style scoped lang="scss">
.word-preview {
  width: 100%;
  height: 100%;
}
</style>
