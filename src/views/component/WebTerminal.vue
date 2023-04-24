<script setup lang="ts">
/* eslint-disable import/named */
import { onMounted, onBeforeMount } from 'vue'
import { ElSpace, ElCard } from 'element-plus'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { FitAddon } from 'xterm-addon-fit'
import { SearchAddon } from 'xterm-addon-search'

const terminal = new Terminal()
const webLicksAddon = new WebLinksAddon()
const fitAddon = new FitAddon()
const searchAddon = new SearchAddon()

terminal.loadAddon(webLicksAddon)
terminal.loadAddon(fitAddon)
terminal.loadAddon(searchAddon)

let id

onMounted(() => {
  terminal.open(document.getElementById('terminal'))
  fitAddon.fit()

  id = setInterval(() => {
    terminal.writeln(`${new Date().getTime()}: hello`)
  }, 1000)
})

onBeforeMount(() => {
  clearInterval(id)
  terminal.dispose()
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-10 py-4 w-full">
    <el-card shadow="always">
      <div id="terminal"></div>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss">
:has(#terminal) {
  width: 800px;
  height: 600px;
}
</style>
