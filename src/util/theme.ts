import { type Theme } from '@/enum'

export const isTheme = (theme: unknown): theme is Theme => {
  return typeof theme === 'string' && ['light', 'dark'].includes(theme)
}
