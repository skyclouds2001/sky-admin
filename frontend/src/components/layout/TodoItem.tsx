import { defineComponent, type PropType } from 'vue'
import { ElTag } from 'element-plus'
import type { Todo } from '@/model'

const TodoItem = defineComponent(
  (props) => {
    return () => (
      <>
        <section class="border-b-[1px] border-solid border-gray-600 py-3 flex justify-between items-start flex-col">
          <div class="text-sm flex">
            <span class="inline-block w-[70%]">{props.todo.title}</span>
            <>
              {props.todo.status === 0 && <ElTag type="info">未开始</ElTag>}
              {props.todo.status === 1 && <ElTag type="success">进行中</ElTag>}
              {props.todo.status === 2 && <ElTag type="warning">将截止</ElTag>}
              {props.todo.status === 3 && <ElTag type="danger">已截止</ElTag>}
            </>
          </div>
          <div class="line-clamp-2 text-ellipsis text-xs">{props.todo.content}</div>
        </section>
      </>
    )
  },
  {
    props: {
      todo: {
        type: Object as PropType<Todo>,
        required: true,
      },
    },
  }
)

export default TodoItem
