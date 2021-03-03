import APISalles from '@/api/salles'

// initial state
const state = () => ({
  salles: [],
  selectedSalle: null,
})

// actions
const actions = {
  fetch({ state, commit }) {
    if (state.salles.length === 0) {
      APISalles.get(salles => {
        commit('SET', salles)
      })
    }
  },
  setSelectedSalle({ commit }, selectedSalle) {
    commit('SET_SELECTED_SALLE', selectedSalle)
  }
}

// mutations
const mutations = {
  SET(state, salles) {
    state.salles = salles
  },
  SET_SELECTED_SALLE(state, selectedSalle) {
    state.selectedSalle = selectedSalle
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}