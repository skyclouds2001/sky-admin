import type { MockMethod as Mock } from 'vite-plugin-mock'
import { articles } from '@/data'

const mocks: Mock[] = [
  {
    url: '/api/article',
    method: 'get',
    statusCode: 200,
    response: ({ query: { page, size } }: { query: Record<'page' | 'size', string> }) => {
      const p = parseInt(page)
      const s = parseInt(size)
      return {
        success: true,
        code: 0,
        message: 'success',
        data: {
          articles: articles.slice((p - 1) * s, s),
          total: articles.length,
          page: p,
          size: s,
        },
      }
    },
  },
]

export default mocks
