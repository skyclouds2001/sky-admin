import { http } from '@/lib'
import type { Response, Article } from '@/model'

/**
 * 获取文章列表方法
 *
 * @returns 文章列表数据
 */
export const getArticles = (): Promise<Response<{ articles: Article[] }>> => http.get('/api/article').then((res) => res.data)
