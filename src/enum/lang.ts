/**
 * 语言
 */
enum Lang {
  /** 中文 */
  zhCN = 'zh-CN',
  /** 英文 */
  enUS = 'en-US',
}

export default Lang

export const isLang = (lang: unknown): lang is Lang => {
  return typeof lang === 'string' && ['zh-CN', 'en-US'].includes(lang)
}
