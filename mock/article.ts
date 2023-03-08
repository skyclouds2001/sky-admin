import type { MockMethod as Mock } from 'vite-plugin-mock'
import { articles } from '@/data'

const mocks: Mock[] = [
  {
    url: '/api/article',
    method: 'get',
    statusCode: 200,
    response: ({ query: { page, size, name } }: { query: Record<'page' | 'size' | 'name', string> }) => {
      const data = articles.filter((v) => v.title.includes(name))
      return {
        success: true,
        code: 0,
        message: 'success',
        data: {
          articles: data.slice((parseInt(page) - 1) * parseInt(size), parseInt(size)),
          total: data.length,
          page: parseInt(page),
          size: parseInt(size),
        },
      }
    },
  },
]

export default mocks
