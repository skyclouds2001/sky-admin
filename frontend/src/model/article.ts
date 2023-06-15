/**
 * 文章数据结构
 */
interface Article {
  /** 文章 ID */
  id: number
  /** 文章标题 */
  title: string
  /** 文章发布时间 YYYY-MM-DD hh:mm:ss */
  time: string
  /** 文章作者 */
  author: string
  /** 文章作者国籍 */
  country: string
  /** 文章审核人 */
  reviewer: string
  /** 文章星级 */
  star: 0 | 1 | 2 | 3 | 4 | 5
  /** 文章阅读量 */
  read: number
  /** 文章状态 */
  status: 'drafted' | 'published'
}

export default Article
