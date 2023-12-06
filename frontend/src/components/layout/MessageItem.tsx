import { defineComponent, type PropType } from 'vue'
import { ElAvatar } from 'element-plus'
import type { Message } from '@/model'

const MessageItem = defineComponent(
  (props) => {
    return () => (
      <>
        <section class="mx-2 flex items-start justify-between border-b-[1px] border-solid border-gray-600 py-3 first:pt-0 last:border-none last:pb-0">
          <div class="grow-[1] py-1">
            <ElAvatar src={props.message.icon} alt={props.message.title} size={30} />
          </div>
          <div class="grow-[7]">
            <div class="flex w-full items-center justify-between text-sm">{props.message.title}</div>
            <div class="line-clamp-1 w-full text-ellipsis text-xs">{props.message.content}</div>
            <div class="mt-1 w-full text-xs">{new Date(props.message.date).toLocaleString()}</div>
          </div>
        </section>
      </>
    )
  },
  {
    props: {
      message: {
        type: Object as PropType<Message>,
        required: true,
      },
    },
  }
)

export default MessageItem
