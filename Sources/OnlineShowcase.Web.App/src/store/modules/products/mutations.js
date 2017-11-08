import { ALL } from './mutation-types'

export default {
  [ALL](state, { response, newfilter, filter }) {
    const { found } = state

    const newProducts = filter.skip === 0 ? response : found.products.concat(response)
    newfilter.sort = filter.sort

    state.found = {
      products: newProducts,
      filter: newfilter
    }
  }
}
