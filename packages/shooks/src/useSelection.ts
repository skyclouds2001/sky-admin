import { computed, type ComputedRef, shallowRef, type ShallowRef } from 'vue'
import { useEventListener } from '.'

const useSelection = (): {
  selection: ShallowRef<Selection | null>
  text: ComputedRef<string>
  ranges: ComputedRef<Range[]>
  rects: ComputedRef<DOMRect[]>
} => {
  const selection = shallowRef<Selection | null>(null)
  const text = computed(() => selection.value?.toString() ?? '')
  const ranges = computed(() => (selection.value !== null ? (new Array(selection.value.rangeCount).fill(0).map((_, i) => selection.value?.getRangeAt(i)) as Range[]) : []))
  const rects = computed(() => ranges.value.map((range) => range.getBoundingClientRect()))

  useEventListener(document, 'selectionchange', () => {
    selection.value = window.getSelection()
  })

  return {
    selection,
    text,
    rects,
    ranges,
  }
}

export default useSelection
