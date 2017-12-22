import toastr from 'toastr'

import * as types from './mutation-types'
import Proxy from '../../../proxies/CategoriesProxy'

export const all = ({ commit }) => {
  commit(types.SET_LOADING, true)

  new Proxy()
    .all()
    .then((response) => {
      commit(types.ALL, response)
      commit(types.SET_LOADING, false)
    })
    .catch(error => {
      toastr.error(error)
    })
}

export default {
  all
}
