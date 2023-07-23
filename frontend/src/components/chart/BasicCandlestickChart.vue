<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { CandlestickChart, type CandlestickSeriesOption } from 'echarts/charts'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

type EchartsOptions = echarts.ComposeOption<CandlestickSeriesOption | GridComponentOption | TitleComponentOption>

echarts.use([CandlestickChart, GridComponent, TitleComponent, CanvasRenderer])

const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  echarts
    .init(el.value as HTMLDivElement, 'light', {
      width: 1000,
      height: 600,
    })
    .setOption<EchartsOptions>({
      title: {
        text: 'Simple Candlestick Chart',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#333',
        },
      },
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E'],
      },
      yAxis: {},
      series: [
        {
          type: 'candlestick',
          data: [
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42],
            [29, 25, 17, 32],
          ],
        },
      ],
    })
})

onBeforeUnmount(() => {
  echarts.getInstanceByDom(el.value as HTMLDivElement)?.dispose()
})
</script>

<template>
  <div ref="el" style="width: 1000px; height: 600px"></div>
</template>

<style scoped lang="scss"></style>
