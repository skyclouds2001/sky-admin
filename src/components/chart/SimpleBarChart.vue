<script setup lang="ts">
import { onMounted } from 'vue'
import { echarts, type EchartsOptions } from '@/lib'

onMounted(() => {
  const el = document.getElementById('simple-bar-chart') as HTMLDivElement

  const options: EchartsOptions = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        // showBackground: true,
        // backgroundStyle: {
        //   color: 'rgba(180, 180, 180, 0.2)',
        // },
      },
    ],
  }

  echarts.getInstanceByDom(el)?.dispose()

  echarts
    .init(el, 'light', {
      width: 1000,
      height: 600,
    })
    .setOption(options)
})
</script>

<template>
  <div id="simple-bar-chart" style="width: 1000px; height: 600px"></div>
</template>

<style scoped lang="scss"></style>
