import { ref, type Ref, reactive, watch } from 'vue'
import { getArticles } from '@/api'
import type { Article, Pagination, Response } from '@/model'

const useArticles = (options: {
  onError?: (error?: Response<Pagination<Article>>) => void
}): {
  articles: Ref<Article[]>
  total: Ref<number>
  page: Ref<number>
  size: Ref<number>
  loading: Ref<boolean>
  search: {
    name: string
  }
  refresh: () => void
  handleSearch: (search: { name: string }) => void
} => {
  const { onError } = options

  const articles = ref<Article[]>([])

  const total = ref(0)

  const page = ref(1)

  const size = ref(10)

  const loading = ref(false)

  const search = reactive({
    name: '',
  })

  const handleSearch = (s: { name: string }): void => {
    search.name = s.name
  }

  const refresh = (): void => {
    void loadArticles(page.value, size.value, search)
  }

  const loadArticles = async (page: number, size: number, search: Record<'name', string>): Promise<void> => {
    try {
      loading.value = true
      const res = await getArticles(page, size, search)
      if (res.success) {
        articles.value = res.data.data
        total.value = res.data.total
      } else {
        if (onError !== undefined) onError(res)
      }
    } catch (error) {
      if (onError !== undefined) onError(error)
    } finally {
      loading.value = false
    }
  }

  watch(
    [page, size, search],
    ([currentPage, currentSize, currentSearch]) => {
      void loadArticles(currentPage, currentSize, currentSearch)
    },
    {
      immediate: true,
      deep: true,
    }
  )

  return {
    articles,
    total,
    page,
    size,
    loading,
    search,
    refresh,
    handleSearch,
  }
}

export default useArticles
