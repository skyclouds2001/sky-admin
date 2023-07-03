import { defineComponent, type PropType } from 'vue'
import './index.css'

const Button = defineComponent({
  props: {
    type: {
      type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>,
      default: '',
      required: false,
      validator: (value: string) => value === '' || ['primary', 'success', 'warning', 'danger', 'info'].includes(value),
    },
    nativeType: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
      required: false,
      validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
    },
  },
  setup: (props, { slots }) => {
    return () => (
      <button type={props.nativeType} class={['sky-button', props.type === 'primary' ? 'sky-button-primary' : '', props.type === 'success' ? 'sky-button-success' : '', props.type === 'warning' ? 'sky-button-warning' : '', props.type === 'danger' ? 'sky-button-danger' : '', props.type === 'info' ? 'sky-button-info' : '']}>
        <span>{slots.default?.()}</span>
      </button>
    )
  },
})

export default Button
