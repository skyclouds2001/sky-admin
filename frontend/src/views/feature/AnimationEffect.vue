<script setup lang="ts">
import { ElSpace } from 'element-plus'
import 'animate.css'
</script>

<template>
  <el-space :size="24" wrap class="p-6">
    <div class="animate__animated animate__bounce inline-block h-24 w-24 rounded border">basic bounce animation</div>
    <div class="animate__animated animate__bounce animate__delay-5s inline-block h-24 w-24 rounded border">with a delay</div>
    <div class="animate__animated animate__bounce animate__faster inline-block h-24 w-24 rounded border">controller speed</div>
    <div class="animate__animated animate__bounce animate__infinite inline-block h-24 w-24 rounded border">repeat</div>
    <div class="animate__animated animate__flash inline-block h-24 w-24 rounded border">basic flash animation</div>
    <div class="animate__animated animate__pulse inline-block h-24 w-24 rounded border">basic pulse animation</div>
    <div class="animate__animated animate__heartBeat inline-block h-24 w-24 rounded border">basic heartBeat animation</div>
    <div class="animate__animated animate__jello inline-block h-24 w-24 rounded border">basic jello animation</div>
    <div class="animate__animated animate__wobble inline-block h-24 w-24 rounded border">basic wobble animation</div>
    <div class="animate__animated animate__tada inline-block h-24 w-24 rounded border">basic tada animation</div>
    <div class="animate__animated animate__swing inline-block h-24 w-24 rounded border">basic swing animation</div>
    <div class="animate__animated animate__headShake inline-block h-24 w-24 rounded border">basic headShake animation</div>
    <div class="animate__animated animate__rubberBand inline-block h-24 w-24 rounded border">basic rubberBand animation</div>
    <div class="animate__animated animate__shakeX inline-block h-24 w-24 rounded border">basic shakeX animation</div>
    <div class="animate__animated animate__shakeY inline-block h-24 w-24 rounded border">basic shakeY animation</div>
  </el-space>
</template>

<style scoped lang="scss"></style>
