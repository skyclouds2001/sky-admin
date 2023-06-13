import { readonly, ref, type Ref } from 'vue'
import { tryOnMounted, tryOnBeforeUnmount } from '.'

const useGeolocation = (
  options: {
    enableHighAccuracy?: boolean
    maximumAge?: number
    timeout?: number
  } = {}
): {
  isSupported: boolean
  geolocation: Readonly<Ref<GeolocationCoordinates>>
  locatedAt: Readonly<Ref<number | null>>
  error: Readonly<Ref<GeolocationPositionError | null>>
} => {
  const { enableHighAccuracy = true, maximumAge = 30000, timeout = 27000 } = options

  const isSupported = 'geolocation' in navigator

  const location = ref<GeolocationCoordinates>({
    accuracy: 0,
    latitude: Infinity,
    longitude: Infinity,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  })

  const locatedAt = ref<number | null>(null)

  const error = ref<GeolocationPositionError | null>(null)

  let watcher: number | null = null

  if (isSupported) {
    tryOnMounted(() => {
      watcher = navigator.geolocation.watchPosition(
        (geo) => {
          location.value = geo.coords
          error.value = null
          locatedAt.value = geo.timestamp
        },
        (err) => {
          error.value = err
        },
        {
          enableHighAccuracy,
          maximumAge,
          timeout,
        }
      )
    })

    tryOnBeforeUnmount(() => {
      if (watcher !== null) {
        navigator.geolocation.clearWatch(watcher)
      }
    })
  }

  return {
    isSupported,
    geolocation: readonly(location),
    locatedAt: readonly(locatedAt),
    error: readonly(error),
  }
}

export default useGeolocation
