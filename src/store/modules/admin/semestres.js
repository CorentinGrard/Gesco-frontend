import semestreAPI from '@/api/admin/semestre'

// initial state
const state = () => ({
  semestres: []
})

// getters
const getters = {
}

// actions
const actions = {
  fetch({ commit }) {
    semestreAPI.getSemestresByPromotion(0, semestres => {
      commit('SET', semestres)
    })
  },
  add({ commit }, semestre) {
    commit('ADD', semestre)
  },
  delete({ commit }, index) {
    commit('DELETE', index)
  },
  update({ commit }, { editedIndex, editedItem }) {
    commit('UPDATE', { editedIndex, editedItem })
  }

}

// mutations
const mutations = {
  SET(state, semestres) {
    state.semestres = semestres
  },
  ADD(state, semestre) {
    state.semestres.push(semestre)
  },
  DELETE(state, index) {
    state.semestres.splice(index, 1)
  },
  UPDATE(state, { editedIndex, editedItem }) {
    Object.assign(state.semestres[editedIndex], editedItem)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
