import mitt from 'mitt'

export const eventBus = mitt<Events>()

interface Events {
  event: string
}
