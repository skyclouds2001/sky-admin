<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, type BarSeriesOption } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, LegendComponent, type LegendComponentOption, TransformComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useTheme } from '@/hook'
import { generateFakeData } from '@/util'

type EchartsOptions = echarts.ComposeOption<BarSeriesOption | GridComponentOption | LegendComponentOption | TitleComponentOption | ToolboxComponentOption | TooltipComponentOption>

echarts.use([BarChart, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer])

const el = ref<HTMLDivElement | null>(null)

const { isLight, isDark } = useTheme()

const data = generateFakeData(10, 100)

onMounted(() => {
  echarts
    .init(el.value as HTMLDivElement, 'light', {
      width: 1000,
      height: 600,
    })
    .setOption<EchartsOptions>({
      title: {
        show: true,
        text: 'Simple Bar Chart',
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
          type: 'shadow',
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
          type: 'bar',
          name: 'data',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
          data: data.map((v) => v.value),
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
