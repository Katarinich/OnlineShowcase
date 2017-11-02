import * as types from './mutation-types'
import Proxy from '../../../proxies/CategoriesProxy'

export const all = ({ commit }) => {
  new Proxy()
    .all()
    .then((response) => {
      commit(types.ALL, response)
    })
    .catch(() => {
      // console.log('Request failed...')
    })
}

export default {
  all
}
