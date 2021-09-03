import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import defaultSetting from './settings'

import ObviousVue from 'obvious-vue'
import { isHost, $bus, $socket, APP_NAME, internalBus, initExternalState } from '@/obvious'
import middleware from '@/obvious/middlereware'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

document.body.innerHTML = '<div id="app"></div>'

const internalSocket = internalBus.createSocket()

let vm = null

$bus.createApp(APP_NAME)
  .bootstrap(async(config = {}) => {
    const settings = config.settings || defaultSetting
    const menus = config.menus || []
    internalSocket.initState('settings', settings)
    internalSocket.initState('menus', menus)
    initExternalState()
    Vue.use(ElementUI, { locale })
    Vue.use(ObviousVue)
    Vue.config.productionTip = false
    vm = new Vue({
      el: '#app',
      router,
      store,
      $bus,
      $socket,
      render: h => h(App)
    })
  })
  .activate(async(config = {}) => {
    config.settings && internalSocket.setState('settings', (prevSettings) => {
      return {
        ...prevSettings,
        ...config.settings
      }
    })
  })
  .destroy(async() => {
    vm.$destroy()
  })

if (isHost) {
  $bus.use(middleware)
  $bus.activateApp(APP_NAME, {
    menus: [
      {
        path: '/',
        title: 'Dashboard',
        icon: 'el-icon-menu'
      },
      {
        path: '/runnan/obvious-demo-react',
        title: 'React Demo',
        icon: 'el-icon-grape',
        children: [

        ]
      },
      {
        path: '/runnan/obvious-demo-vue',
        title: 'Vue Demo',
        icon: 'el-icon-cherry',
        children: [

        ]
      }
    ]
  })
}
