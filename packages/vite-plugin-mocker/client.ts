void window.navigator.serviceWorker.register('./mocker.ts', {
  scope: '/',
  type: 'module',
  updateViaCache: 'all',
})

void window.navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((registration) => {
    void registration.unregister()
    void registration.update()
  })
})
