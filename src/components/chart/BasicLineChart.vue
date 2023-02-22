<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { echarts, type EchartsOptions } from '@/lib'

onMounted(() => {
  echarts
    .init(document.getElementById('basic-line-chart') as HTMLDivElement, 'light', {
      width: 1000,
      height: 600,
    })
    .setOption<EchartsOptions>({
      title: {
        show: true,
        text: 'Simple Line Chart',
        left: 'center',
        top: 'top',
      },
      legend: {
        show: true,
        data: ['data'],
        left: 'right',
        top: 'bottom',
      },
      grid: {
        show: true,
        top: '5%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        show: true,
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        show: true,
        type: 'value',
      },
      series: [
        {
          type: 'line',
          name: 'data',
          data: [150, 230, 224, 218, 135, 147, 260],
        },
      ],
    })
})

onBeforeUnmount(() => {
  echarts.getInstanceByDom(document.getElementById('basic-line-chart') as HTMLDivElement)?.dispose()
})
</script>

<template>
  <div id="basic-line-chart" style="width: 1000px; height: 600px"></div>
</template>

<style scoped lang="scss"></style>
