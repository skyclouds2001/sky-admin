import mitt from 'mitt'

export const eventBus = mitt<Events>()

interface Events {
  foo: string
  bar?: number
  [key: string | symbol]: unknown
}
