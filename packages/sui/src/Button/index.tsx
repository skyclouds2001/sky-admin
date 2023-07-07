import { defineComponent, type PropType, type SlotsType } from 'vue'
import './index.css'

const Button = defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'>,
      default: 'default',
      required: false,
      validator: (value: string) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value),
    },
    round: {
      type: Boolean,
      default: false,
      required: false,
    },
    circle: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    nativeType: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
      required: false,
      validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false,
    },
    size: {
      type: String as PropType<'large' | 'default' | 'small'>,
      default: 'default',
      required: false,
      validator: (value: string) => ['large', 'default', 'small'].includes(value),
    },
  },
  slots: Object as SlotsType<{
    default: () => any
  }>,
  setup: (props, { slots }) => {
    return () => (
      <>
        <button aria-disabled={props.disabled} disabled={props.disabled} type={props.nativeType} autofocus={props.autofocus} class={['sky-button', props.type !== 'default' ? `sky-button-${props.type}` : '', props.round ? 'sky-button-round' : '', props.circle ? 'sky-button-circle' : '', props.disabled ? 'sky-button-disabled' : '', props.size !== 'default' ? `sky-button-${props.size}` : '']}>
          <span>{slots.default()}</span>
        </button>
      </>
    )
  },
})

export default Button
