/**
 * 初始化媒体录制方法
 * @param stream 媒体流
 * @param mimeType MIMETYPE
 * @returns MediaRecorder 对象
 */
export const initVideoRecorderStream = (stream: MediaStream, mimeType?: string): MediaRecorder => {
  const mediaRecorder = new MediaRecorder(stream, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType,
  })

  mediaRecorder.addEventListener('dataavailable', (e) => {
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

  mediaRecorder.addEventListener('error', (error) => {
    console.error(error)
  })

  return mediaRecorder
}
