import { defineComponent } from 'vue'
import './index.css'

const Button = defineComponent({
  props: {
    type: {
      type: String,
      default: '',
      required: false,
      validate: (value: string) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value),
    },
  },
  setup: (props, { slots }) => {
    return () => (
      <button class={['sky-button', props.type === 'primary' ? 'sky-button-primary' : '', props.type === 'success' ? 'sky-button-success' : '', props.type === 'warning' ? 'sky-button-warning' : '', props.type === 'danger' ? 'sky-button-danger' : '', props.type === 'info' ? 'sky-button-info' : '']}>
        <span>{slots.default?.()}</span>
      </button>
    )
  },
})

export default Button
