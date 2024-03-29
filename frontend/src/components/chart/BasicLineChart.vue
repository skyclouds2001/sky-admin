<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, LegendComponent, type LegendComponentOption, TransformComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

type EchartsOptions = echarts.ComposeOption<LineSeriesOption | GridComponentOption | LegendComponentOption | TitleComponentOption | ToolboxComponentOption | TooltipComponentOption>

echarts.use([LineChart, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer])

const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  echarts
    .init(el.value as HTMLDivElement, 'light', {
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
          color: '#999',
        },
      },
      legend: {
        show: true,
        data: ['data'],
        left: 'right',
        top: 'bottom',
        textStyle: {
          color: '#999',
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
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      },
      yAxis: {
        show: true,
        type: 'value',
      },
      series: [
        {
          type: 'line',
          name: 'data',
          data: [20, 34, 10, 38, 45, 23, 21],
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
