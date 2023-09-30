window.navigator.serviceWorker.register('/mocker.ts', {
  scope: '/',
  type: 'module',
  updateViaCache: 'imports',
})

window.navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((registration) => {
    registration.update()

    registration.addEventListener('updatefound', () => {
      registration.update()
    })
  })
})

window.navigator.serviceWorker.startMessages()
