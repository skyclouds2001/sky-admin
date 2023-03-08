import { ref, watch, type Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getArticles } from '@/api'
import type { Article } from '@/model'

const useArticles = (): {
  articles: Ref<Article[]>
  total: Ref<number>
  page: Ref<number>
  size: Ref<number>
  loading: Ref<boolean>
} => {
  const articles = ref<Article[]>([])

  const total = ref(0)

  const page = ref(1)

  const size = ref(10)

  const loading = ref(false)

  watch(
    [page, size],
    async ([currentPage, currentSize]) => {
      loading.value = true
      try {
        const res = await getArticles({
          page: currentPage,
          size: currentSize,
        })
        if (res.success) {
          articles.value = res.data.articles
          total.value = res.data.total
        } else {
          ElMessage.error({
            message: `ERROR ${res.code}: ${res.message}`,
            showClose: true,
            center: true,
            grouping: true,
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
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
    loading,
  }
}

export default useArticles
