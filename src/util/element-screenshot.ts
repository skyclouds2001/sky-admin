import { downloadFile } from '@/util'

/**
 * 生成视频截图
 * @param source Video 标签元素
 */
export const captureScreenshot = (source: HTMLVideoElement): void => {
  const canvas = document.createElement('canvas')
  canvas.width = source.videoWidth
  canvas.height = source.videoHeight
  canvas.hidden = true
  canvas.style.display = 'none'

  const ctx = canvas.getContext('2d')
  if (ctx === null) throw new Error("Can't get CanvasRenderingContext2D.")
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height)

  canvas.toBlob((blob) => {
    if (blob === null) throw new Error("Can't get blob data.")

    downloadFile(blob, '截图')
  })
}
