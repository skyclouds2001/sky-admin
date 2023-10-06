import { defineComponent, type PropType } from 'vue'
import { ElTag } from 'element-plus'
import type { Todo } from '@/model'

const TodoItem = defineComponent(
  (props) => {
    return () => (
      <>
        <section class="border-b-[1px] last:border-none border-solid border-gray-600 mx-2 py-3 first:pt-0 last:pb-0 flex justify-between items-start flex-col">
          <div class="text-sm flex justify-between items-center w-full">
            <span class="inline-block">{props.todo.title}</span>
            <>
              {props.todo.status === 0 && <ElTag type="info">未开始</ElTag>}
              {props.todo.status === 1 && <ElTag type="success">进行中</ElTag>}
              {props.todo.status === 2 && <ElTag type="warning">将截止</ElTag>}
              {props.todo.status === 3 && <ElTag type="danger">已截止</ElTag>}
            </>
          </div>
          <div class="line-clamp-2 text-ellipsis text-xs w-full">{props.todo.content}</div>
          <div class="text-xs w-full mt-1">{new Date(props.todo.date).toLocaleString()}</div>
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
