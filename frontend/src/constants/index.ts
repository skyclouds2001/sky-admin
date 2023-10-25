import { type InjectionKey, type Ref } from 'vue'

export const SettingDrawerKey = Symbol('setting') as InjectionKey<Ref<boolean>>

export const MenuCollapseKey = Symbol('menu') as InjectionKey<Ref<boolean>>
