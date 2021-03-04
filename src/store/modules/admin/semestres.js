import semestreAPI from '@/api/admin/semestre'

// initial state
const state = () => ({
  semestres: [],
  selectedSemestre: {}
})

// getters
const getters = {
}

// actions
const actions = {
  fetch({ commit }, idPromotion) {
    semestreAPI.getSemestresByPromotion(idPromotion, semestres => {
      commit('SET', semestres)
    })
  },
  add({ commit }, { id, semestre }) {
    semestreAPI.add(id, semestre, semestre => {
      commit('ADD', semestre)
    })
  },
  update({ commit }, { id, semestre }) {
    semestreAPI.update(id, semestre, semestre => {
      commit('UPDATE', { id: semestre.id, semestre })
    })
  },
  delete({ commit }, id) {
    semestreAPI.delete(id, () => {
      commit('DELETE', id)
    })
  },
  setSelectedSemestre({ commit }, selectedSemestre) {
    commit('SET_SELECTED_SEMESTRE', selectedSemestre)
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
  DELETE(state, id) {
    let index = state.semestres.findIndex(semestre => semestre.id === id)
    state.semestres.splice(index, 1)
  },
  UPDATE(state, { id, semestre }) {
    Object.assign(state.semestres.find(semestre => semestre.id === id), semestre)
  },
  SET_SELECTED_SEMESTRE(state, selectedSemestre) {
    state.selectedSemestre = selectedSemestre
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
