import { Lang } from '@/enum'
import { zhCN, enUS } from '@/i18n'

/**
 * 获取路由对应语言版本的名称
 *
 * @param key 路由path
 * @param lang 当前语言
 * @returns 路由名称
 */
export const getRouterName = (key: string, lang: Lang): string => {
  let val = 'unknown'

  switch (lang) {
    case Lang.zhCN:
      val = Reflect.get(zhCN.router, key) ?? 'unknown'
      break
    case Lang.enUS:
      val = Reflect.get(enUS.router, key) ?? 'unknown'
      break
  }

  return val
}
