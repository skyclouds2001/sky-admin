import { defineComponent, type PropType } from 'vue'
import { ElAvatar } from 'element-plus'
import type { Notification } from '@/model'

const NotificationItem = defineComponent(
  (props) => {
    return () => (
      <>
        <section class="border-b-[1px] last:border-none border-solid border-gray-600 mx-2 py-3 first:pt-0 last:pb-0 flex justify-between items-start">
          <div class="grow-[1] py-1">
            <ElAvatar src={props.notification.icon} alt={props.notification.title} size={30} />
          </div>
          <div class="grow-[7]">
            <div class="text-sm flex justify-between items-center w-full">{props.notification.title}</div>
            <div class="line-clamp-1 text-ellipsis text-xs w-full">{props.notification.content}</div>
            <div class="text-xs w-full mt-1">{new Date(props.notification.date).toLocaleString()}</div>
          </div>
        </section>
      </>
    )
  },
  {
    props: {
      notification: {
        type: Object as PropType<Notification>,
        required: true,
      },
    },
  }
)

export default NotificationItem
