<script setup lang="ts">
import { ElSpace } from 'element-plus'
import 'animate.css'
</script>

<template>
  <el-space :size="24" wrap class="p-6">
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__bounce">basic bounce animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__bounce animate__delay-5s">with a delay</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__bounce animate__faster">controller speed</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__bounce animate__infinite">repeat</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__flash">basic flash animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__pulse">basic pulse animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__heartBeat">basic heartBeat animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__jello">basic jello animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__wobble">basic wobble animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__tada">basic tada animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__swing">basic swing animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__headShake">basic headShake animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__rubberBand">basic rubberBand animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__shakeX">basic shakeX animation</div>
    <div class="inline-block w-24 h-24 border rounded animate__animated animate__shakeY">basic shakeY animation</div>
  </el-space>
</template>

<style scoped lang="scss"></style>
