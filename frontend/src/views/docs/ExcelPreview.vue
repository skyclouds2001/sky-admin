<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { read, utils } from 'xlsx'
import { DEMO_EXCEL_SRC } from '@/config'

const contest = ref('')

onMounted(() => {
  fetch(DEMO_EXCEL_SRC)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const workbook = read(buffer)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const html = utils.sheet_to_html(worksheet)
      contest.value = html
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="excel-preview" v-html="contest"></div>
</template>

<style scoped lang="scss">
.excel-preview {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 1500px;
}
</style>
