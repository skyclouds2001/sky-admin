<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts/core'
import { PieChart, type PieSeriesOption } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, LegendComponent, type LegendComponentOption, TransformComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTheme } from '@/hook'
import { generateFakeData } from '@/util'

type EchartsOptions = echarts.ComposeOption<PieSeriesOption | GridComponentOption | LegendComponentOption | TitleComponentOption | ToolboxComponentOption | TooltipComponentOption>

echarts.use([PieChart, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer])

const { isLight, isDark } = useTheme()

const data = generateFakeData(10, 100)

onMounted(() => {
  echarts
    .init(document.getElementById('simple-pie-chart') as HTMLDivElement, 'light', {
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
          color: isLight.value ? '#333' : isDark.value ? '#ccc' : '#333',
        },
      },
      legend: {
        show: true,
        orient: 'vertical',
        left: 'left',
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
          data,
        },
      ],
    })
})

onBeforeUnmount(() => {
  echarts.getInstanceByDom(document.getElementById('simple-pie-chart') as HTMLDivElement)?.dispose()
})
</script>

<template>
  <div id="simple-pie-chart" style="width: 1000px; height: 600px"></div>
</template>

<style scoped lang="scss"></style>
