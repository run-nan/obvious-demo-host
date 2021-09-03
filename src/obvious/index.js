import { touchBus, Bus } from 'obvious-core'

const [mainBus, isMainBusHost] = touchBus()

export const APP_NAME = 'runnan/obvious-demo-host'
export const $bus = mainBus
export const $socket = mainBus.createSocket()
export const internalBus = new Bus('privateByDemoHost')
export const isHost = isMainBusHost()

export const initExternalState = () => {
  $socket.initState('user', { name: '', avatar: '' })
  $socket.initState('breadcrumb', [])
}
