import { type Ref, unref } from 'vue'

const useShare = (
  defaultData?: ShareData | Ref<ShareData>
): {
  isSupported: boolean
  share: (data?: ShareData | Ref<ShareData>) => Promise<void>
  canShare: (data?: ShareData | Ref<ShareData>) => boolean
} => {
  const isSupported = 'share' in navigator && 'canShare' in navigator

  const share = async (data?: ShareData | Ref<ShareData>): Promise<void> => {
    await navigator.share({ ...unref(defaultData), ...unref(data) })
  }

  const canShare = (data?: ShareData | Ref<ShareData>): boolean => {
    return navigator.canShare({ ...unref(defaultData), ...unref(data) })
  }

  return {
    isSupported,
    share,
    canShare,
  }
}

export default useShare
