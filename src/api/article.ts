import { http } from '@/lib'
import type { Response, Article } from '@/model'

/**
 * 获取文章列表方法
 *
 * @param data 分页参数
 * @param data.page 页面下标
 * @param data.size 页面容量
 * @param data.search 搜索参数
 * @param data.search.name 搜索文章名称
 * @returns 文章列表数据
 */
export const getArticles = ({ page, size, search: { name } }: { page: number; size: number; search: { name: string } }): Promise<Response<{ articles: Article[]; total: number }>> => http.get(`/api/article?page=${page}&size=${size}&name=${name}`).then((res) => res.data)
