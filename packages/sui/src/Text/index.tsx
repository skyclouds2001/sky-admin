import { defineComponent, type PropType, type SlotsType } from 'vue'
import './index.css'

const Text = defineComponent({
  props: {
    type: {
      type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'>,
      default: 'default',
      required: false,
      validator: (value: string) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value),
    },
  },
  slots: Object as SlotsType<{
    default: () => any
  }>,
  setup: (props, { slots }) => {
    return () => (
      <>
        <span class={['sky-text', props.type !== 'default' ? `sky-text-${props.type}` : '']}>{slots.default()}</span>
      </>
    )
  },
})

export default Text
