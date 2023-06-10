/**
 * 主题
 */
enum Theme {
  /** 亮 */
  LIGHT = 'light',
  /** 暗 */
  DARK = 'dark',
}

export default Theme

export const isTheme = (theme: unknown): theme is Theme => {
  return typeof theme === 'string' && ['light', 'dark'].includes(theme)
}
