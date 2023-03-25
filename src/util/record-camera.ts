import { ElMessage } from 'element-plus'

/**
 * 初始化视频流方法
 *
 * @param el Video 标签元素
 * @param id Device 设备 ID
 */
export const initCameraStream = async (el: HTMLVideoElement, id: string): Promise<void> => {
  try {
    el.srcObject = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        deviceId: {
          exact: id,
        },
      },
    })
  } catch (error) {
    ElMessage.error({
      message: error instanceof Error ? `${error.name}: ${error.message}` : '加载失败',
    })
  }
}

/**
 * 初始化视频输入类型方法
 *
 * @param fn 获取设备列表信息回调方法
 */
export const initDevices = async (fn: (devices: MediaDeviceInfo[]) => void): Promise<void> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    fn(devices.filter((v) => v.kind === 'videoinput'))
  } catch (error) {
    ElMessage.error({
      message: error instanceof Error ? `${error.name}: ${error.message}` : '加载失败',
    })
  }
}

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
