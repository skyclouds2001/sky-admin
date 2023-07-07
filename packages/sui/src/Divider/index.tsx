import { defineComponent } from 'vue'
import './index.css'

const Divider = defineComponent({
  name: 'Divider',
  setup: () => {
    return () => (
      <>
        <div class={['el-divider']}></div>
      </>
    )
  },
})

export default Divider
