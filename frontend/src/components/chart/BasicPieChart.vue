<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { PieChart, type PieSeriesOption } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, LegendComponent, type LegendComponentOption, TransformComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

type EchartsOptions = echarts.ComposeOption<PieSeriesOption | GridComponentOption | LegendComponentOption | TitleComponentOption | ToolboxComponentOption | TooltipComponentOption>

echarts.use([PieChart, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer])

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
        text: 'Simple Pie Chart',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#999',
        },
      },
      legend: {
        show: true,
        orient: 'vertical',
        left: 'left',
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
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Access From',
          radius: '50%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          data: [
            {
              name: 'A',
              value: 20,
            },
            {
              name: 'B',
              value: 34,
            },
            {
              name: 'C',
              value: 10,
            },
            {
              name: 'D',
              value: 38,
            },
            {
              name: 'E',
              value: 45,
            },
            {
              name: 'F',
              value: 23,
            },
            {
              name: 'G',
              value: 21,
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
