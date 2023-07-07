interface ScreenOrientation {
  lock: (type: OrientationLockType) => Promise<void>
}

type OrientationLockType = 'any' | 'natural' | 'landscape' | 'portrait' | 'landscape-primary' | 'landscape-secondary' | 'portrait-primary' | 'portrait-secondary'
