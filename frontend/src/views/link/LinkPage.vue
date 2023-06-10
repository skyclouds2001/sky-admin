<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

/**
 * 跳转路径
 */
const url = decodeURIComponent(route.params.to.toString())
</script>

<template>
  <iframe class="inner-link" name="inner-link" title="inner-link" referrerpolicy="no-referrer" :src="url"></iframe>
</template>

<style scoped lang="scss">
.inner-link {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 800px;
}
</style>
