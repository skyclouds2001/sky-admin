import { defineComponent } from 'vue'

const Button = defineComponent({
  setup: () => {
    return () => (
      <div>
        <button>button</button>
      </div>
    )
  },
})

export default Button
