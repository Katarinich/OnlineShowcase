import { isTokenExpired } from '@/utils/jwt-helpers'

function checkToken(token) {
  if (!token || isTokenExpired(token)) {
    return false
  }

  return true
}

export default {
  isAuthenticated: state => checkToken(state.token),
  isContentEditor: (state, getters) => getters.isInRoles('Admin', 'Contant Manager'),
  isInRoles: (state, getters) => (...roles) => {
    const { profile } = state

    if (!getters.isAuthenticated || !profile.groups) {
      return false
    }

    const intersect = profile.groups.filter(el => roles.indexOf(el) !== -1)

    return intersect.length > 0
  }
}
