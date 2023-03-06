import { ref, watch, type Ref } from 'vue'
import { getArticles } from '@/api'
import type { Article } from '@/model'

const useArticles = (): {
  articles: Ref<Article[]>
  total: Ref<number>
  page: Ref<number>
  size: Ref<number>
} => {
  const articles = ref<Article[]>([])

  const total = ref(0)

  const page = ref(1)

  const size = ref(10)

  watch(
    [page, size],
    async ([currentPage, currentSize]) => {
      try {
        const res = await getArticles({
          page: currentPage,
          size: currentSize,
        })
        if (res.success) {
          articles.value = res.data.articles
          total.value = res.data.total
        } else {
          console.error(res.code, res.message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    {
      immediate: true,
    }
  )

  return {
    articles,
    total,
    page,
    size,
  }
}

export default useArticles
