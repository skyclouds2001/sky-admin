import { onMounted, onBeforeUnmount, reactive, readonly } from 'vue'

type Geolocation = {
  -readonly [K in keyof GeolocationCoordinates]: GeolocationCoordinates[K]
}

const useGeolocation = (): {
  geolocation: Readonly<Geolocation>
} => {
  const geolocation = navigator.geolocation

  const location = reactive<Geolocation>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    accuracy: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  })

  let id: number

  onMounted(() => {
    id = geolocation.watchPosition(
      (geo) => {
        location.latitude = geo.coords.latitude
        location.longitude = geo.coords.longitude
        location.altitude = geo.coords.altitude
        location.accuracy = geo.coords.accuracy
        location.altitudeAccuracy = geo.coords.altitudeAccuracy
        location.heading = geo.coords.heading
        location.speed = geo.coords.speed
      },
      (error) => {
        console.error(`ERROR(${error.code}): ${error.message}`)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 30000,
      }
    )

    geolocation.getCurrentPosition(
      (geo) => {
        location.latitude = geo.coords.latitude
        location.longitude = geo.coords.longitude
        location.altitude = geo.coords.altitude
        location.accuracy = geo.coords.accuracy
        location.altitudeAccuracy = geo.coords.altitudeAccuracy
        location.heading = geo.coords.heading
        location.speed = geo.coords.speed
      },
      (error) => {
        console.error(`ERROR(${error.code}): ${error.message}`)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 30000,
      }
    )
  })

  onBeforeUnmount(() => {
    geolocation.clearWatch(id)
  })

  return {
    geolocation: readonly(location),
  }
}

export default useGeolocation
