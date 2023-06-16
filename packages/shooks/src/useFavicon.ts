import { ref, type Ref, watch } from 'vue'

const useFavicon = (initial?: string): Ref<string | null> => {
  const favicon = ref<string | null>(initial ?? '')

  watch(
    favicon,
    (current, previous) => {
      if (current !== previous && typeof current === 'string') {
        document.head.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]').forEach((el) => {
          el.href = current
        })
      }
    },
    {
      immediate: true,
    }
  )

  return favicon
}

export default useFavicon
