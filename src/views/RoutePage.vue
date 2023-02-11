<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const text = ref('')

onBeforeMount(() => {
  text.value = Array.isArray(route.params.id) ? route.params.id.reduce((pre, cur) => pre + '-' + cur, '') : ''
})
</script>

<template>
  <span>菜单{{ text }}</span>
</template>

<style scoped lang="scss"></style>
