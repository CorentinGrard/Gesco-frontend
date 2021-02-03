import APIPromotions from '../../api/promotions'

// initial state
const state = () => ({
  promotions: [],
  selectedPromotion: {}
})

// actions
const actions = {
  fetchPromotions({ state, commit }) {
    if (state.promotions.length === 0) {
      APIPromotions.getPromotions(promotions => {
        commit('setPromotions', promotions)
      })
    }
  },
  setSelectedPromotion({ commit }, selectedPromotion) {
    commit('setSelectedPromotion', selectedPromotion)
  }
}

// mutations
const mutations = {
  setPromotions(state, promotions) {
    state.promotions = promotions
  },
  setSelectedPromotion(state, selectedPromotion) {
    state.selectedPromotion = selectedPromotion
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}