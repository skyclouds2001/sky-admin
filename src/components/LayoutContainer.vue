<script setup lang="ts">
import { ElContainer, ElAside, ElHeader, ElMain, ElFooter } from 'element-plus'
</script>

<template>
  <ElContainer class="page-container">
    <ElAside>Aside</ElAside>
    <ElContainer>
      <ElHeader>Header</ElHeader>
      <ElMain>
        <slot></slot>
      </ElMain>
      <ElFooter>Footer</ElFooter>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss">
.page-container {
  width: 100vw;
  min-height: 100vh;
}
</style>
