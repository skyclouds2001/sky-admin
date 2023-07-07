interface Navigator {
  clearAppBadge: () => Promise<void>
  setAppBadge: (contents?: number) => Promise<void>
}
