/**
 * 初始化视频流方法
 * @param el Video 标签元素
 */
export const initScreenStream = async (el: HTMLVideoElement): Promise<void> => {
  try {
    el.srcObject = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    })
  } catch {}
}

/**
 * 获取支持的 MIME TYPE
 * @returns 支持的 MIME TYPE 列表
 */
export const getSupportedMimeTypes = (): string[] => {
  const media = 'video'

  // 常用的视频格式
  const types = ['webm', 'mp4', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'ts', 'x-matroska'] as const
  // 常用的视频编码
  const codecs = ['vp9', 'vp9.0', 'vp8', 'vp8.0', 'avc1', 'av1', 'h265', 'h264'] as const
  // 支持的媒体类型
  const supported: string[] = []

  types.forEach((type) => {
    const mimeType = `${media}/${type}`
    if (MediaRecorder.isTypeSupported(mimeType)) supported.push(mimeType)
    codecs.forEach((codec) => {
      const mimeTypes = [`${mimeType};codecs=${codec}`, `${mimeType};codecs=${codec.toUpperCase()}`]

      mimeTypes.forEach((variation) => {
        if (MediaRecorder.isTypeSupported(variation)) supported.push(variation)
      })
    })
  })

  return supported
}
