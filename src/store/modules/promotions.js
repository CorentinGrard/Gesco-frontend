import APIPromotions from '../../api/promotions'

// initial state
const state = () => ({
  promotions: null
})

// actions
const actions = {
  fetchPromotions({ state, commit }) {
    if (state.promotions === null) {
      APIPromotions.getPromotions(promotions => {
        console.log(promotions)
        commit('setPromotions', promotions)
      })
    }
  }
}

// mutations
const mutations = {
  setPromotions(state, promotions) {
    state.promotions = promotions
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}