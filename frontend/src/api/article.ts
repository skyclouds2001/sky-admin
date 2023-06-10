import { http } from '@/lib'
import type { Response, Article } from '@/model'

/**
 * 获取文章列表方法
 * @param data 分页参数
 * @param data.page 页面下标
 * @param data.size 页面容量
 * @param data.search 搜索参数
 * @param data.search.name 搜索文章名称
 * @returns 文章列表数据
 */
export const getArticles = ({
  page,
  size,
  search: { name },
}: {
  page: number
  size: number
  search: { name: string }
}): Promise<
  Response<{
    articles: Article[]
    total: number
  }>
> =>
  http
    .get(`/api/article`, {
      params: {
        page,
        size,
        name,
      },
    })
    .then((res) => res.data)

/**
 * 添加文章信息方法
 * @param article 文章信息
 * @returns null
 */
export const addArticle = (article: Omit<Article, 'id'>): Promise<Response<null>> =>
  http
    .post('/api/article', {
      article,
    })
    .then((res) => res.data)

/**
 * 更新文章信息方法
 * @param article 文章信息
 * @returns null
 */
export const updateArticle = (article: Partial<Omit<Article, 'id'>> & { id: Article['id'] }): Promise<Response<null>> =>
  http
    .put('/api/article', {
      article,
    })
    .then((res) => res.data)

/**
 * 删除文章信息方法
 * @param id 文章ID
 * @returns null
 */
export const removeArticle = (id: number): Promise<Response<null>> =>
  http
    .delete('/api/article', {
      data: {
        id,
      },
    })
    .then((res) => res.data)
