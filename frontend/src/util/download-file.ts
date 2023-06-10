/**
 * 下载文件方法
 * @param blob 文件数据
 * @param fileName 文件名称
 */
export const downloadFile = (blob: Blob, fileName = 'file'): void => {
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.target = '_blank'
  a.hidden = true
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  window.URL.revokeObjectURL(url)
}
