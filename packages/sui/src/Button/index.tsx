import { defineComponent } from 'vue'
import styles from './index.module.css'

const Button = defineComponent({
  setup: () => {
    return () => (
      <div>
        <button style={styles.button}>button</button>
      </div>
    )
  },
})

export default Button
