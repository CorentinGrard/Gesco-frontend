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
    semestreAPI.delete(id)
    commit('DELETE', id)
  },
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
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
