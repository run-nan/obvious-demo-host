import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import ObviousVue from 'obvious-vue'
import { isSelfActivate, $bus, $socket, APP_NAME } from '@/obvious'

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

$bus.createApp(APP_NAME)
  .bootstrap(async(config) => {
    // set ElementUI lang to EN
    Vue.use(ElementUI, { locale })
    Vue.use(ObviousVue)

    Vue.config.productionTip = false

    new Vue({
      el: '#app',
      router,
      store,
      $bus,
      $socket,
      render: h => h(App)
    })
  })

if (isSelfActivate) {
  $bus.activateApp(APP_NAME)
}
