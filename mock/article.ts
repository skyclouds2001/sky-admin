import type { MockMethod as Mock } from 'vite-plugin-mock'
import { articles as data } from '@/data'
import type { Article } from '@/model'

let articles = [...data]

const mocks: Mock[] = [
  {
    url: '/api/article',
    method: 'get',
    statusCode: 200,
    response: ({ query: { page = '1', size = '10', name = '' } }: { query: Record<'page' | 'size' | 'name', string> }) => {
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
    response: ({ body: { article } }: { body: Record<'article', Omit<Article, 'id'>> }) => {
      const a = article as Article
      a.id = articles.reduce((pre, cur) => (cur.id > pre ? cur.id : pre), 0)
      articles.push(a)
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
    response: ({ body: { article } }: { body: Record<'article', Partial<Omit<Article, 'id'>> & { id: Article['id'] }> }) => {
      const index = articles.findIndex((v) => v.id === article.id)
      if (index !== -1) {
        articles[index] = { ...articles[index], ...article }
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
    response: ({ body: { id } }: { body: Record<'id', string> }) => {
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
