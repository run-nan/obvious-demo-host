import { internalBus } from '@/obvious'

const socket = internalBus.createSocket()

export default function getPageTitle(pageTitle) {
  const title = socket.getState('settings.title')
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
