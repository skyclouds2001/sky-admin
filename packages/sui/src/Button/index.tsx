import { defineComponent, type PropType, type SlotsType } from 'vue'
import './index.css'

const Button = defineComponent({
  props: {
    type: {
      type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'>,
      default: 'default',
      required: false,
      validator: (value: string) => value === '' || ['primary', 'success', 'warning', 'danger', 'info'].includes(value),
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
  },
  slots: Object as SlotsType<{
    default: () => any
  }>,
  setup: (props, { slots }) => {
    return () => (
      <button aria-disabled={props.disabled} disabled={props.disabled} type={props.nativeType} autofocus={props.autofocus} class={['sky-button', props.type !== 'default' ? `sky-button-${props.type}` : '', props.disabled ? 'sky-button-disabled' : '']}>
        <span>{slots.default()}</span>
      </button>
    )
  },
})

export default Button
