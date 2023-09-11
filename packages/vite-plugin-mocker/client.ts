void window.navigator.serviceWorker.register('./mocker.ts', {
  scope: '/',
  type: 'module',
  updateViaCache: 'all',
})
