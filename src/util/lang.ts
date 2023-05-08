import { type Lang } from '@/enum'

export const isLang = (lang: unknown): lang is Lang => {
  return typeof lang === 'string' && ['zh-CN', 'en-US'].includes(lang)
}
