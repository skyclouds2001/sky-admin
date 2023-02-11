<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { usePagesStore } from '@/store'

const store = usePagesStore()

onBeforeMount(() => {
  store.pages = [
    {
      name: '首页',
      path: '/',
    },
  ]
})
</script>

<template>
  <div class="w-10">home page</div>
</template>

<style scoped lang="scss"></style>
