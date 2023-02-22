import * as echarts from 'echarts/core'
import { BarChart, type BarSeriesOption } from 'echarts/charts'
import { GridComponent, type GridComponentOption, TitleComponent, type TitleComponentOption, TooltipComponent, type TooltipComponentOption, ToolboxComponent, type ToolboxComponentOption, TransformComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart])

echarts.use([GridComponent, TitleComponent, TooltipComponent, ToolboxComponent, TransformComponent])

echarts.use([LabelLayout, UniversalTransition])

echarts.use([CanvasRenderer])

export type EchartsOptions = echarts.ComposeOption<BarSeriesOption | GridComponentOption | TitleComponentOption | TooltipComponentOption | ToolboxComponentOption>

export default echarts
