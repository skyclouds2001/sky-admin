/**
 * open new tab
 * @param href - target page url
 * @param self - whether open in new page
 */
export const openPage = (href: string, self = false): void => {
  const a = document.createElement('a')
  a.href = href
  a.title = ''
  a.target = self ? '_self' : '_blank'
  a.hidden = true
  document.documentElement.appendChild(a)
  a.click()
  document.documentElement.removeChild(a)
}
