import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import categories from './modules/categories'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    categories
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
