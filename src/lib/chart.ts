import * as echarts from 'echarts/core'
import { BarChart, type BarSeriesOption, PieChart, type PieSeriesOption } from 'echarts/charts'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, LegendComponent, type LegendComponentOption, TransformComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart, PieChart])

echarts.use([GridComponent, TitleComponent, TooltipComponent, ToolboxComponent, LegendComponent, TransformComponent])

echarts.use([LabelLayout, UniversalTransition])

echarts.use([CanvasRenderer])

export type EchartsOptions = echarts.ComposeOption<BarSeriesOption | PieSeriesOption | GridComponentOption | TitleComponentOption | TooltipComponentOption | ToolboxComponentOption | LegendComponentOption>

export default echarts
