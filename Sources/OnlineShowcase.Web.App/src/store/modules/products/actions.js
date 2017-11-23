import toastr from 'toastr'

import * as types from './mutation-types'
import Proxy from '../../../proxies/ProductsProxy'

const isSameArrays = (a, b) => {
  if (!a && !b) {
    return true
  }

  if ((a && !b) || (!a && b)) {
    return false
  }

  return a.filter(x => b.indexOf(x) === -1).length === 0
}

export const all = ({ commit, state }, filter, force) => {
  const { sorts, found } = state

  const sort = !filter.sort ? null : sorts[filter.sort]

  if (
    !force && found && found.filter.skip === filter.skip &&
    found.filter.take === filter.take && found.filter.sort === sort &&
    isSameArrays(found.filter.categories, filter.categories)
  ) {
    return
  }

  const newfilter = Object.assign({}, filter)
  newfilter.sort = sort

  if (force) {
    newfilter.skip = 0
  }

  new Proxy()
    .setParameters(newfilter)
    .all()
    .then((response) => {
      commit(types.ALL, { response, newfilter, filter })
    })
    .catch(error => {
      toastr.error(error)
    })
}

export const find = ({ commit, state }, id) => {
  new Proxy()
  .find(id)
  .then((response) => {
    commit(types.FIND, { response })
  })
  .catch(error => {
    toastr.error(error)
  })
}

export default {
  all,
  find
}
