import type { ComponentOptions } from 'vue'

declare module '*.vue' {
  const componentOptions: ComponentOptions
  export default componentOptions
}

export {}
