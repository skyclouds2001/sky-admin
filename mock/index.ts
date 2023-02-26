import type { MockMethod as Mock } from 'vite-plugin-mock'

const mocks: Mock[] = [
  {
    url: '/api/test',
    method: 'get',
    statusCode: 200,
    response: {
      success: true,
      code: 0,
      message: 'success',
      data: {
        name: 'hello',
      },
    },
  },
]

export default mocks
