import { http } from '@/lib'
import type { Response, Article } from '@/model'

/**
 * 获取文章列表方法
 *
 * @param data 分页参数
 * @param data.page 页面下标
 * @param data.size 页面容量
 * @returns 文章列表数据
 */
export const getArticles = ({ page, size }: { page: number; size: number }): Promise<Response<{ articles: Article[]; total: number }>> => http.get(`/api/article?page=${page}&size=${size}`).then((res) => res.data)
