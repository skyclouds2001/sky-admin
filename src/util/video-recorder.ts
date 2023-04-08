import { ElMessage } from 'element-plus'

/**
 * 初始化视频控制流方法
 *
 * @param el 视频元素
 * @param mimeType MIMETYPE
 * @returns MediaRecorder 对象
 */
export const initVideoRecorderStream = (el: HTMLVideoElement, mimeType?: string): MediaRecorder => {
  const stream = el?.captureStream()

  const mediaRecorder = new MediaRecorder(stream, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType,
  })

  mediaRecorder?.addEventListener('dataavailable', (e) => {
    const blob = new Blob([e.data], { type: 'video/mp4' })
    const link = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = link
    a.download = '录制'
    a.target = '_blank'
    a.hidden = true
    a.style.display = 'none'
    a.click()
  })

  mediaRecorder?.addEventListener('error', () => {
    ElMessage.error({
      message: '录屏失败',
    })
  })

  return mediaRecorder
}
