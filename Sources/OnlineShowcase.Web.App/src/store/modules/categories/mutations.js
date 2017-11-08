import { ALL } from './mutation-types'

export default {
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
