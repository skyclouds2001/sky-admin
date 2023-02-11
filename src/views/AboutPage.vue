<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { usePagesStore } from '@/store'

const store = usePagesStore()

onBeforeMount(() => {
  store.pages = [
    {
      name: '首页',
      path: '/home',
    },
    {
      name: '关于',
      path: '/about',
    },
  ]
})
</script>

<template>
  <div class="w-10">about page</div>
</template>

<style scoped lang="scss"></style>
