import { defineComponent, type PropType } from 'vue'
import { ElAvatar } from 'element-plus'
import type { Message } from '@/model'

const MessageItem = defineComponent(
  (props) => {
    return () => (
      <>
        <section class="border-b-[1px] last:border-none border-solid border-gray-600 mx-2 py-3 first:pt-0 last:pb-0 flex justify-between items-start">
          <div class="grow-[1] py-1">
            <ElAvatar src={props.message.icon} alt={props.message.title} size={30} />
          </div>
          <div class="grow-[7]">
            <div class="text-sm flex justify-between items-center w-full">{props.message.title}</div>
            <div class="line-clamp-1 text-ellipsis text-xs w-full">{props.message.content}</div>
            <div class="text-xs w-full mt-1">{new Date(props.message.date).toLocaleString()}</div>
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
