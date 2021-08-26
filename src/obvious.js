let indexBus = window.__Bus__ && window.__Bus__.index
export const isSelfActivate = !indexBus

if (isSelfActivate) {
  const { createBus } = require('obvious-core')
  indexBus = createBus('index')
}

export const APP_NAME = 'runnan/obvious-demo-host'
export const $bus = indexBus
export const $socket = indexBus.createSocket()

