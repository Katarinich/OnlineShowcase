import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import categories from './modules/categories'
import products from './modules/products'
import notifications from './modules/notifications'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    notifications,
    categories,
    products,
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
