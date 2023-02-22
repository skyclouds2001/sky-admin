<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { echarts, type EchartsOptions } from '@/lib'

onMounted(() => {
  echarts
    .init(document.getElementById('basic-scatter-chart') as HTMLDivElement, 'light', {
      width: 1000,
      height: 800,
    })
    .setOption<EchartsOptions>({
      title: {
        show: true,
        text: 'Simple Scatter Chart',
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
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      yAxis: {
        show: true,
        type: 'value',
      },
      series: [
        {
          type: 'scatter',
          name: 'data',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    })
})

onBeforeUnmount(() => {
  echarts.getInstanceByDom(document.getElementById('basic-scatter-chart') as HTMLDivElement)?.dispose()
})
</script>

<template>
  <div id="basic-scatter-chart" style="width: 1000px; height: 600px"></div>
</template>

<style scoped lang="scss"></style>
