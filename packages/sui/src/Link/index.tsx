import { defineComponent, type PropType, type SlotsType } from 'vue'
import './index.css'

const Link = defineComponent({
  name: 'Link',
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
        <a class={['sky-link', props.type !== 'default' ? `sky-text-${props.type}` : '']}>{slots.default()}</a>
      </>
    )
  },
})

export default Link
