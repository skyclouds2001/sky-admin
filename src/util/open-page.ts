/**
 * 打开新页面方法
 *
 * @param href - 新页面 URL
 */
export const openNewPage = (href: string): void => {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.setAttribute('title', '')
  a.setAttribute('target', '_blank')
  a.click()
}
