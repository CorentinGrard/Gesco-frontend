import elevesAPI from '@/api/assistantPedagogique/eleves'

// initial state
const state = () => ({
  eleves: []
})

// getters
const getters = {

}

// actions
const actions = {
  getAllEleves({ commit }) {
    elevesAPI.getEleves(eleves => {
      commit('SET_ELEVES', eleves)
    })
  }
}

// mutations
const mutations = {
  SET_ELEVES(state, eleves) {
    state.eleves = eleves
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}