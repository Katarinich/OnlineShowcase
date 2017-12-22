import { ALL, SET_LOADING } from './mutation-types'

export default {
  [SET_LOADING](state, loading) {
    state.isCategoriesLoading = loading
  },
  [ALL](state, categories) {
    state.list = categories

    state.categoryMap = {}
    categories.forEach((category) => {
      state.categoryMap[category.id] = category

      if (category.children && category.children.length > 0) {
        category.children.forEach((child) => {
          state.categoryMap[child.id] = child
        })
      }
    })
  }
}
