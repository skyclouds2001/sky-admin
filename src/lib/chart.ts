import * as echarts from 'echarts/core'
import { BarChart, type BarSeriesOption } from 'echarts/charts'
import { GridComponent, type GridComponentOption } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart, GridComponent, CanvasRenderer])

export type EchartsOptions = echarts.ComposeOption<BarSeriesOption | GridComponentOption>

export default echarts
