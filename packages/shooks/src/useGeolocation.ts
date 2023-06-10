import { onBeforeUnmount, onMounted, ref, type Ref, shallowRef, type ShallowRef } from 'vue'

const useGeolocation = (
  options: {
    enableHighAccuracy?: boolean
    maximumAge?: number
    timeout?: number
  } = {}
): {
  isSupported: boolean
  geolocation: Ref<GeolocationCoordinates>
  locatedAt: Ref<number | null>
  error: ShallowRef<GeolocationPositionError | null>
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

  const error = shallowRef<GeolocationPositionError | null>(null)

  let watcher: number | null = null

  onMounted(() => {
    if (isSupported) {
      watcher = window.navigator.geolocation.watchPosition(
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
    }
  })

  onBeforeUnmount(() => {
    if (isSupported && watcher !== null) {
      window.navigator.geolocation.clearWatch(watcher)
    }
  })

  return {
    isSupported,
    geolocation: location,
    locatedAt,
    error,
  }
}

export default useGeolocation
