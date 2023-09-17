void window.navigator.serviceWorker.register('./mocker.ts', {
  scope: '/',
  type: 'module',
  updateViaCache: 'all',
})

void window.navigator.serviceWorker.ready.then(() => {
  window.navigator.serviceWorker.controller.postMessage(document.getElementById('script[type="mappers"]').innerText)
})
