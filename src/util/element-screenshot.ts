/**
 * 生成视频截图
 *
 * @param video Video 标签元素
 */
export const captureScreenshot = (video: HTMLVideoElement): void => {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.hidden = true
  canvas.style.display = 'none'
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  canvas.toBlob((blob) => {
    const data = URL.createObjectURL(blob as Blob)
    const a = document.createElement('a')
    a.href = data
    a.download = '截图'
    a.target = '_blank'
    a.hidden = true
    a.style.display = 'none'
    a.click()
  })
}
