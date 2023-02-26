<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { echarts, type EchartsOptions } from '@/lib'
import { useThemeStore } from '@/store'
import { generateFakeData } from '@/util'

const themeStore = useThemeStore()

const data = generateFakeData(10, 100)

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
        textStyle: {
          color: themeStore.isLight() ? '#333' : '#ccc',
        },
      },
      legend: {
        show: true,
        data: ['data'],
        left: 'right',
        top: 'bottom',
        textStyle: {
          color: themeStore.isLight() ? '#333' : '#ccc',
        },
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
        data: data.map((v) => v.name),
      },
      yAxis: {
        show: true,
        type: 'value',
      },
      series: [
        {
          type: 'line',
          name: 'data',
          data: data.map((v) => v.value),
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
