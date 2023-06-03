/**
 * 初始化视频流方法
 * @param el Video 标签元素
 * @param id Device 设备 ID
 */
export const initCameraStream = async (el: HTMLVideoElement, id?: string): Promise<void> => {
  try {
    el.srcObject = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        deviceId: {
          exact: id,
        },
      },
    })
  } catch {}
}

/**
 * 初始化视频输入类型方法
 * @param fn 获取设备列表信息回调方法
 */
export const initDevices = async (fn: (devices: MediaDeviceInfo[]) => void): Promise<void> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    fn(devices.filter((v) => v.kind === 'videoinput'))
  } catch {}
}
