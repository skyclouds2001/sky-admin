import { defineComponent, type PropType } from 'vue'
import { ElAvatar } from 'element-plus'
import type { Notification } from '@/model'

const NotificationItem = defineComponent(
  (props) => {
    return () => (
      <>
        <section class="mx-2 flex items-start justify-between border-b-[1px] border-solid border-gray-600 py-3 first:pt-0 last:border-none last:pb-0">
          <div class="grow-[1] py-1">
            <ElAvatar src={props.notification.icon} alt={props.notification.title} size={30} />
          </div>
          <div class="grow-[7]">
            <div class="flex w-full items-center justify-between text-sm">{props.notification.title}</div>
            <div class="line-clamp-1 w-full text-ellipsis text-xs">{props.notification.content}</div>
            <div class="mt-1 w-full text-xs">{new Date(props.notification.date).toLocaleString()}</div>
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
