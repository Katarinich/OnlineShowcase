import Vue from 'vue'

import './plugins/vuex'
import './plugins/axios'
import { router } from './plugins/vue-router'
import './plugins/vuex-router-sync'
import './plugins/vee-validations'

import App from './App'
import store from './store'

import './assets/css/bootstrap.css'
import './assets/css/style.css'
import './assets/css/form.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#container',
  router,
  store,
  render: h => h(App)
})
