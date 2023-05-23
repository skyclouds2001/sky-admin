<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, LegendComponent, type LegendComponentOption, TransformComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTheme } from '@/hook'
import { generateFakeData } from '@/util'

type EchartsOptions = echarts.ComposeOption<LineSeriesOption | GridComponentOption | LegendComponentOption | TitleComponentOption | ToolboxComponentOption | TooltipComponentOption>

echarts.use([LineChart, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer])

const { isLight, isDark } = useTheme()

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
