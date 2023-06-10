const readImageFile = (image: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.addEventListener('error', (e) => {
      reject(e)
    })

    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      img.src = e.target?.result as string
    })
    reader.addEventListener('error', (e) => {
      reject(e)
    })
    reader.readAsDataURL(image)
  })
}

const readImageSource = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.addEventListener('error', (e) => {
      reject(e)
    })
    img.src = src
  })
}

export const compressImage = async ({ image, type = 'image/png', quality = 1, maxWidth, maxHeight }: { image: File | string; type?: string; maxWidth: number; maxHeight: number; quality?: number }): Promise<Blob> => {
  let img: HTMLImageElement
  if (image instanceof File) {
    img = await readImageFile(image)
  } else {
    img = await readImageSource(image)
  }

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (context == null) {
    throw new Error('Create Canvas Context Fail')
  }

  const { width, height } = img
  let targetWidth = width
  let targetHeight = height
  if (width > maxWidth || height > maxHeight) {
    if (width / height > 1) {
      targetWidth = maxWidth
      targetHeight = Math.round(maxWidth * (height / width))
    } else {
      targetHeight = maxHeight
      targetWidth = Math.round(maxHeight * (width / height))
    }
  }

  canvas.width = targetWidth
  canvas.height = targetHeight
  context.clearRect(0, 0, targetWidth, targetHeight)
  context.drawImage(img, 0, 0, targetWidth, targetHeight)

  return await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob != null) {
          resolve(blob)
        } else {
          reject(new Error('No blob data transformed'))
        }
      },
      type,
      quality
    )
  })
}
