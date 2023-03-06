import type { MockMethod as Mock } from 'vite-plugin-mock'
import { articles } from '@/data'

const mocks: Mock[] = [
  {
    url: '/api/article',
    method: 'get',
    statusCode: 200,
    response: {
      success: true,
      code: 0,
      message: 'success',
      data: {
        articles,
      },
    },
  },
]

export default mocks
