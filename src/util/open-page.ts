/**
 * 在新标签页打开目标页面方法
 *
 * @param href - 目标页面 URL
 */
export const openNewPageInNewTab = (href: string): void => {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.setAttribute('title', '')
  a.setAttribute('target', '_blank')
  a.click()
}

/**
 * 在当前标签页打开目标页面方法
 *
 * @param href - 目标页面 URL
 */
export const openNewPageInCurrentTab = (href: string): void => {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.setAttribute('title', '')
  a.setAttribute('target', '_self')
  a.click()
}
