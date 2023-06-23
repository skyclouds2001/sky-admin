/**
 * 文章数据结构
 */
interface Article {
  /** 文章 ID */
  id: number
  /** 文章标题 */
  title: string
  /** 文章描述 */
  description: string
  /** 文章星级 */
  star: 0 | 1 | 2 | 3 | 4 | 5
  /** 文章阅读量 */
  read: number
  /** 文章状态 */
  status: 'Drafted' | 'Published'
  /** 文章作者 ID */
  authorId: number
  /** 文章作者信息 */
  author: object
  /** 文章发布时间 */
  createdAt: string
  /** 文章更新时间 */
  updatedAt: string
}

export default Article
