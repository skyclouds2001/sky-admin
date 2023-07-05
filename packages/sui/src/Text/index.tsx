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
    size: {
      type: String as PropType<'large' | 'default' | 'small'>,
      default: 'default',
      required: false,
      validator: (value: string) => ['large', 'default', 'small'].includes(value),
    },
    ellipsis: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  slots: Object as SlotsType<{
    default: () => any
  }>,
  setup: (props, { slots }) => {
    return () => (
      <>
        <span class={['sky-text', props.type !== 'default' ? `sky-text-${props.type}` : '', props.size !== 'default' ? `sky-text-${props.size}` : '', props.ellipsis ? 'sky-text-ellipsis' : '']}>{slots.default()}</span>
      </>
    )
  },
})

export default Text
