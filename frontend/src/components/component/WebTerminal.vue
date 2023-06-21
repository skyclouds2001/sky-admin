<script setup lang="ts">
/* eslint-disable import/named */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { FitAddon } from 'xterm-addon-fit'
import { SearchAddon } from 'xterm-addon-search'

const el = ref<HTMLDivElement | null>(null)

const terminal = new Terminal()
const webLicksAddon = new WebLinksAddon()
const fitAddon = new FitAddon()
const searchAddon = new SearchAddon()

terminal.loadAddon(webLicksAddon)
terminal.loadAddon(fitAddon)
terminal.loadAddon(searchAddon)

let id: number

onMounted(() => {
  if (!el.value) return

  terminal.open(el.value as HTMLDivElement)
  fitAddon.fit()

  id = window.setInterval(() => {
    terminal.writeln(`${Date.now()}: hello`)
  }, 1000)
})

onBeforeUnmount(() => {
  window.clearInterval(id)
  terminal.dispose()
})
</script>

<template>
  <div ref="el"></div>
</template>

<style scoped lang="scss">
:has(#terminal) {
  width: 800px;
  height: 600px;
}
</style>
