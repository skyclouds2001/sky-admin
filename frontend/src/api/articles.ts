import { http } from '@/lib'
import type { Article, Pagination, Response } from '@/model'

/**
 * 获取文章列表方法
 * @param data 分页参数
 * @param data.page 页面下标
 * @param data.size 页面容量
 * @param data.search 搜索参数
 * @param data.search.name 搜索文章名称
 * @returns 文章列表数据
 */
export const getArticles = ({ page, size, search: { name } }: { page: number; size: number; search: { name: string } }): Promise<Response<Pagination<Article>>> =>
  http.get(`/api/articles`, {
    params: {
      page,
      size,
      name,
    },
  })

/**
 * 添加文章信息方法
 * @param article 文章信息
 * @returns null
 */
export const addArticle = (article: Omit<Article, 'id'>): Promise<Response<null>> =>
  http.post('/api/articles', {
    article,
  })

/**
 * 更新文章信息方法
 * @param article 文章信息
 * @returns null
 */
export const updateArticle = (article: Partial<Omit<Article, 'id'>> & { id: Article['id'] }): Promise<Response<null>> =>
  http.put('/api/articles', {
    article,
  })

/**
 * 删除文章信息方法
 * @param id 文章ID
 * @returns null
 */
export const removeArticle = (id: number): Promise<Response<null>> =>
  http.delete('/api/articles', {
    data: {
      id,
    },
  })
