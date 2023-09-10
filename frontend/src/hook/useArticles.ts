import { ref, type Ref, reactive, watch } from 'vue'
import { getArticles } from '@/api'
import { useApi } from '@/hook'
import type { Article } from '@/model'

const useArticles = (): {
  articles: Ref<Article[]>
  total: Ref<number>
  page: Ref<number>
  size: Ref<number>
  error: Ref<unknown>
  loading: Ref<boolean>
  search: Partial<Article>
  refresh: () => void
} => {
  const articles = ref<Article[]>([])

  const total = ref(0)

  const page = ref(1)

  const size = ref(10)

  const search: Partial<Article> = reactive({
    title: '',
  })

  const refresh = (): void => {
    void loadData(page.value, size.value, search)
  }

  const { loading, result, error, fetch } = useApi(getArticles)

  const loadData = async (pageIndex: number, pageSize: number, pageSearch: Partial<Article>): Promise<void> => {
    void fetch(pageIndex, pageSize, pageSearch).then(() => {
      if (result.value !== null) {
        articles.value = result.value.data.data
        total.value = result.value.data.total
        page.value = result.value.data.page
        size.value = result.value.data.size
      }
    })
  }

  watch(
    [page, size, search],
    ([currentPage, currentSize, currentSearch]) => {
      void loadData(currentPage, currentSize, currentSearch)
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
    error,
    loading,
    search,
    refresh,
  }
}

export default useArticles
