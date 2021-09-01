import { internalBus } from '@/obvious'

const socket = internalBus.createSocket()

export default function getPageTitle(pageTitle) {
  console.log(internalBus)
  const title = socket.getState('settings.title')
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
