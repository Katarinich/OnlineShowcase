import * as types from './mutation-types'

export const set = ({ commit }, { profile, token }) => {
  commit(types.SET, { profile, token })
}

export const clear = ({ commit }) => {
  commit(types.CLEAR)
}

export const check = ({ commit }) => {
  commit(types.CHECK)
}

export default {
  set,
  clear,
  check
}
