import type { MockMethod as Mock } from 'vite-plugin-mock'
import { articles as data } from '@/data'

let articles = [...data]

const mocks: Mock[] = [
  {
    url: '/api/article',
    method: 'get',
    statusCode: 200,
    response: ({ query }) => {
      const { page, size, name } = query
      const data = articles.filter((v) => v.title.includes(name))
      return {
        success: true,
        code: 0,
        message: 'success',
        data: {
          articles: data.slice((parseInt(page) - 1) * parseInt(size), parseInt(page) * parseInt(size)),
          total: data.length,
          page: parseInt(page),
          size: parseInt(size),
        },
      }
    },
  },
  {
    url: '/api/article',
    method: 'post',
    statusCode: 200,
    response: ({ body }) => {
      const { article } = body
      article.id = articles.reduce((pre, cur) => (cur.id > pre ? cur.id : pre), 0)
      articles.push(article)
      return {
        success: true,
        code: 0,
        message: '添加成功',
        data: null,
      }
    },
  },
  {
    url: '/api/article',
    method: 'put',
    statusCode: 200,
    response: ({ body }) => {
      const { article } = body
      const a = articles.find((v) => v.id === article.id)
      const index = articles.findIndex((v) => v.id === article.id)
      if (index !== -1 && a !== undefined) {
        articles.splice(index, 1, { ...a, ...article })
        return {
          success: true,
          code: 0,
          message: '修改成功',
          data: null,
        }
      } else {
        return {
          success: false,
          code: 10000,
          message: '不存在对应ID的文章',
          data: null,
        }
      }
    },
  },
  {
    url: '/api/article',
    method: 'delete',
    statusCode: 200,
    response: ({ body }) => {
      const { id } = body
      const data = articles.filter((v) => v.id !== parseInt(id))
      if (data.length !== articles.length) {
        articles = data
        return {
          success: true,
          code: 0,
          message: '删除成功',
          data: null,
        }
      } else {
        return {
          success: false,
          code: 10000,
          message: '不存在对应ID的文章',
          data: null,
        }
      }
    },
  },
]

export default mocks
