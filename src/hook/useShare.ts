import { type Ref, unref } from 'vue'

const useShare = (
  defaultData?: ShareData | Ref<ShareData>
): {
  isSupported: boolean
  share: (data?: ShareData) => Promise<void>
  canShare: (data?: ShareData) => boolean
} => {
  const isSupported = 'share' in navigator && 'canShare' in navigator

  const share = async (data?: ShareData | Ref<ShareData>): Promise<void> => {
    await navigator.share({ ...unref(defaultData), ...data })
  }

  const canShare = (data?: ShareData | Ref<ShareData>): boolean => {
    return navigator.canShare({ ...unref(defaultData), ...data })
  }

  return {
    isSupported,
    share,
    canShare,
  }
}

export default useShare
