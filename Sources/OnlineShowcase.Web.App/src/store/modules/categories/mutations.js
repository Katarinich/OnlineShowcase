import { ALL } from './mutation-types'

export default {
  [ALL](state, categories) {
    state.list = categories
  }
}
