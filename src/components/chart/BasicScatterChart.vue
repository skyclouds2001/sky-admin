<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts/core'
import { ScatterChart, type ScatterSeriesOption } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, LegendComponent, type LegendComponentOption, TransformComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTheme } from '@/hook'
import { generateFakeData } from '@/util'

type EchartsOptions = echarts.ComposeOption<ScatterSeriesOption | GridComponentOption | LegendComponentOption | TitleComponentOption | ToolboxComponentOption | TooltipComponentOption>

echarts.use([ScatterChart, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer])

const { isLight, isDark } = useTheme()

const data = generateFakeData(10, 100)

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
        textStyle: {
          color: isLight.value ? '#333' : isDark.value ? '#ccc' : '#333',
        },
      },
      legend: {
        show: true,
        data: ['data'],
        left: 'right',
        top: 'bottom',
        textStyle: {
          color: isLight.value ? '#333' : isDark.value ? '#ccc' : '#333',
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
        data: data.map((v) => v.name),
      },
      yAxis: {
        show: true,
        type: 'value',
      },
      series: [
        {
          type: 'scatter',
          name: 'data',
          data: data.map((v) => v.value),
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
