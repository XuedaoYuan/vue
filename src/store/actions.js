import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.TOGGLE_CURRENT_VIEW, {
      id: product.id
    })
  }
}
