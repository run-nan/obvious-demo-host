import { createBus, Bus } from 'obvious-core'

let indexBus = window.__Bus__ && window.__Bus__.index
export const isSelfActivate = !indexBus

if (isSelfActivate) {
  indexBus = createBus('index')
}

export const APP_NAME = 'runnan/obvious-demo-host'
export const $bus = indexBus
export const $socket = indexBus.createSocket()
export const internalBus = new Bus('privateByDemoHost')

export const initExternalState = () => {
  $socket.initState('user', { name: '', avatar: '' })
  $socket.initState('breadcrumb', [])
}

