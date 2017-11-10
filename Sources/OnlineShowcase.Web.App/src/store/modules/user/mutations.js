import Vue from 'vue'

import { SET, CLEAR, CHECK } from './mutation-types'

function setUser(profile, token) {
  localStorage.setItem('profile', JSON.stringify(profile))
  localStorage.setItem('id_token', token)
}

function clearUser() {
  localStorage.removeItem('profile')
  localStorage.removeItem('id_token')
}

export default {
  [SET](state, { profile, token }) {
    setUser(profile, token)

    state.profile = profile
    state.token = token
  },

  [CHECK](state) {
    const token = localStorage.getItem('id_token')
    const profile = JSON.parse(localStorage.getItem('profile'))

    if (!!token && !!profile) {
      state.token = token
      state.profile = profile

      Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },

  [CLEAR](state) {
    clearUser()

    state.profile = null
    state.token = null
  }
}
