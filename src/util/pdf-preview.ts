import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'

const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')

GlobalWorkerOptions.workerSrc = pdfjsWorker

/**
 * 渲染 PDF 方法
 *
 * @param url - PDF 文件 url
 * @param canvas - 渲染 canvas 元素目标容器
 */
export const renderPDF = async (url: string, canvas: HTMLCanvasElement): Promise<void> => {
  try {
    const pdf = await getDocument(url).promise

    const page = await pdf.getPage(1)
    const viewport = page.getViewport({
      scale: 1.5,
    })
    const outputScale = window.devicePixelRatio

    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    if (!Number.isNaN(viewport.width) && !Number.isNaN(viewport.height)) {
      canvas.width = viewport.width * outputScale
      canvas.height = viewport.height * outputScale
      canvas.style.width = `${viewport.width}px`
      canvas.style.height = `${viewport.height}px`
    } else {
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.minWidth = '1000px'
      canvas.style.minHeight = '1200px'
    }

    const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null

    page.render({
      canvasContext: context,
      viewport,
      transform: transform as number[],
    })
  } catch (error) {
    console.error(error)
  }
}
