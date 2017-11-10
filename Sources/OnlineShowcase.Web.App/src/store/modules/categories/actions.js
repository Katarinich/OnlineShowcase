import toastr from 'toastr'

import * as types from './mutation-types'
import Proxy from '../../../proxies/CategoriesProxy'

export const all = ({ commit }) => {
  new Proxy()
    .all()
    .then((response) => {
      commit(types.ALL, response)
    })
    .catch(error => {
      toastr.error(error)
    })
}

export default {
  all
}
