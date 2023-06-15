import { defineComponent, h } from 'vue'
import { ElIcon } from 'element-plus'

const IconItem = defineComponent({
  name: 'IconItem',
  props: {
    icon: {
      type: Object,
      default: null,
    },
  },
  render() {
    return h(ElIcon, { size: 40 }, { default: () => h(this.icon, null) })
  },
})

export default IconItem
