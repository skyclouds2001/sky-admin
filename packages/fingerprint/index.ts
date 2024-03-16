/**
 * the main entry to generate fingerprint result
 * @returns generate result
 */
export function generate(): string {
  const data = new Map<string, string | number | boolean>()

  data.set('user-agent', navigator.userAgent)

  data.set('language', navigator.language)

  data.set('languages', navigator.languages.join())

  data.set('hardware-concurrency', navigator.hardwareConcurrency)

  data.set('max-touch-points', navigator.maxTouchPoints)

  data.set('device-memory', navigator.deviceMemory as number)

  data.set('webdriver', navigator.webdriver)

  data.set('cookie-enabled', navigator.cookieEnabled)

  data.set('pdf-viewer-enabled', navigator.pdfViewerEnabled)

  data.set('device-pixel-ratio', window.devicePixelRatio)

  data.set('screen-resolution', [screen.width, screen.height].join())

  data.set('available-screen-resolution', [screen.availWidth, screen.availHeight].join())

  data.set('color-depth', screen.colorDepth)

  data.set('pixel-depth', screen.pixelDepth)

  data.set('timezone-offset', new Date().getTimezoneOffset())

  data.set('session-storage', generateSessionStorage())

  data.set('local-storage', generateLocalStorage())

  data.set('indexed-db', generateIndexedDB())

  data.set('color-gamut', generateColorGamut())

  data.set('prefers-contrast', generateContrast())

  data.set('forced-colors', generateForcedColor())

  data.set('dynamic-range', generateDynamicRange())

  data.set('inverted-colors', generateInvertedColors())

  data.set('monochrome', generateMonochrome())

  data.set('prefers-reduced-motion', generateReduceMotion())

  data.set('prefers-reduced-transparency', generateReduceTransparency())

  return JSON.stringify(Object.fromEntries(data))
}

/**
 *
 */
function generateColorGamut(): string {
  for (const gamut of ['rec2020', 'p3', 'srgb'] as const) {
    if (window.matchMedia(`(color-gamut: ${gamut})`).matches) {
      return gamut
    }
  }
  return 'srgb'
}

/**
 *
 */
function generateContrast(): string {
  for (const contrast of ['no-preference', 'more', 'less', 'custom'] as const) {
    if (window.matchMedia(`(prefers-contrast: ${contrast})`).matches) {
      return contrast
    }
  }
  return 'no-preference'
}

/**
 *
 */
function generateForcedColor(): string {
  for (const color of ['active', 'none'] as const) {
    if (window.matchMedia(`(forced-colors: ${color})`).matches) {
      return color
    }
  }
  return 'none'
}

/**
 *
 */
function generateDynamicRange(): string {
  for (const range of ['high', 'standard'] as const) {
    if (window.matchMedia(`(dynamic-range: ${range})`).matches) {
      return range
    }
  }
  return 'standard'
}

/**
 *
 */
function generateInvertedColors(): string {
  for (const color of ['inverted', 'none'] as const) {
    if (window.matchMedia(`(inverted-colors: ${color})`).matches) {
      return color
    }
  }
  return 'none'
}

/**
 *
 */
function generateMonochrome(): number {
  if (!window.matchMedia(`(min-monochrome: 0)`).matches) {
    return 0
  }
  for (let level = 0; level < 100; ++level) {
    if (window.matchMedia(`(max-monochrome: ${level})`).matches) {
      return level
    }
  }
  return 0
}

/**
 *
 */
function generateReduceMotion(): string {
  for (const motion of ['reduce', 'no-preference'] as const) {
    if (window.matchMedia(`(prefers-reduced-motion: ${motion})`).matches) {
      return motion
    }
  }
  return 'no-preference'
}

/**
 *
 */
function generateReduceTransparency(): string {
  for (const transparency of ['reduce', 'no-preference'] as const) {
    if (window.matchMedia(`(prefers-reduced-transparency: ${transparency})`).matches) {
      return transparency
    }
  }
  return 'no-preference'
}

/**
 *
 */
function generateSessionStorage(): boolean {
  try {
    return window.sessionStorage != null
  } catch {
    return false
  }
}

/**
 *
 */
function generateLocalStorage(): boolean {
  try {
    return window.localStorage != null
  } catch {
    return false
  }
}

/**
 *
 */
function generateIndexedDB(): boolean {
  try {
    return window.indexedDB != null
  } catch {
    return false
  }
}

export default generate
