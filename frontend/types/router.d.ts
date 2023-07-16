import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    isView: boolean
  }
}
