import { defineComponent, type PropType } from 'vue'
import { ElTag } from 'element-plus'
import type { Todo } from '@/model'

const TodoItem = defineComponent(
  (props) => {
    return () => (
      <>
        <section class="mx-2 flex flex-col items-start justify-between border-b-[1px] border-solid border-gray-600 py-3 first:pt-0 last:border-none last:pb-0">
          <div class="flex w-full items-center justify-between text-sm">
            <span class="inline-block">{props.todo.title}</span>
            <>
              {props.todo.status === 0 && <ElTag type="info">未开始</ElTag>}
              {props.todo.status === 1 && <ElTag type="success">进行中</ElTag>}
              {props.todo.status === 2 && <ElTag type="warning">将截止</ElTag>}
              {props.todo.status === 3 && <ElTag type="danger">已截止</ElTag>}
            </>
          </div>
          <div class="line-clamp-2 w-full text-ellipsis text-xs">{props.todo.content}</div>
          <div class="mt-1 w-full text-xs">{new Date(props.todo.date).toLocaleString()}</div>
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
