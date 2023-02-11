<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.params)
const text = Array.isArray(route.params.id) ? route.params.id.reduce((pre, cur) => pre + '-' + cur, '') : ''
</script>

<template>
  <span>菜单{{ text }}</span>
</template>

<style scoped lang="scss"></style>
