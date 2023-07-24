<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { RadarChart, type RadarSeriesOption } from 'echarts/charts'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, LegendComponent, type LegendComponentOption, TransformComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

type EchartsOptions = echarts.ComposeOption<RadarSeriesOption | GridComponentOption | LegendComponentOption | TitleComponentOption | ToolboxComponentOption | TooltipComponentOption>

echarts.use([RadarChart, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer])

const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  echarts
    .init(el.value as HTMLDivElement, 'light', {
      width: 1000,
      height: 600,
    })
    .setOption<EchartsOptions>({
      title: {
        text: 'Simple Radar Chart',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#999',
        },
      },
      legend: {
        data: ['dataA', 'dataB'],
        left: 'right',
        top: 'bottom',
        textStyle: {
          color: '#999',
        },
      },
      grid: {
        top: '5%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      radar: {
        indicator: [
          {
            name: 'A',
          },
          {
            name: 'B',
          },
          {
            name: 'C',
          },
          {
            name: 'D',
          },
          {
            name: 'E',
          },
          {
            name: 'F',
          },
          {
            name: 'G',
          },
        ],
      },
      series: [
        {
          type: 'radar',
          name: 'data',
          data: [
            {
              name: 'dataA',
              value: [20, 34, 10, 38, 45, 23, 21],
            },
            {
              name: 'dataB',
              value: [40, 17, 20, 19, 22, 12, 32],
            },
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
