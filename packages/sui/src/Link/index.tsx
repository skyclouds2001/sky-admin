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
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String as PropType<'_self', '_blank', '_parent', '_top'>,
      default: '_self',
      required: false,
      validator: (value: string) => ['_self', '_blank', '_parent', '_top'].includes(value),
    },
    download: {
      type: String,
      default: '',
      required: false,
    },
  },
  slots: Object as SlotsType<{
    default: () => any
  }>,
  setup: (props, { slots }) => {
    return () => (
      <>
        <a href={props.href} target={props.target} download={props.download} class={['sky-link', props.type !== 'default' ? `sky-text-${props.type}` : '']}>
          <span>{slots.default()}</span>
        </a>
      </>
    )
  },
})

export default Link
