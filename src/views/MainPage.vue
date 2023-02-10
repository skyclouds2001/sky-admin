<script setup lang="ts">
import { useMainStore } from '@/store'

const store = useMainStore()

const increase = () => {
  store.increase()
}

const decrease = () => {
  store.decrease()
}
</script>

<template>
  <div class="w-10">main</div>
  <div>
    <span @click="decrease">-</span>
    <span>{{ store.count }}</span>
    <span @click="increase">+</span>
  </div>
</template>

<style scoped></style>
