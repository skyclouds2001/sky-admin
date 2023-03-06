import { ref, watch, type Ref } from 'vue'
import { getArticles } from '@/api'
import type { Article } from '@/model'

const useArticles = (): {
  articles: Ref<Article[]>
  page: Ref<number>
  size: Ref<number>
} => {
  const articles = ref<Article[]>([])

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
    page,
    size,
  }
}

export default useArticles
