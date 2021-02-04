import APIMatieres from '../../api/matieres'

// initial state
const state = () => ({
  matieres: [],
  selectedMatiere: {}
})

const getters = {
  getForCreationCours: (state) => {
    return state.matieres.map(semestes => {
      let tmpSemestre = {}
      tmpSemestre.idSemestre = semestes.idSemestre
      tmpSemestre.nomSemestre = semestes.nomSemestre
      tmpSemestre.matieres = []
      semestes.modules.forEach(module => {
        tmpSemestre.matieres = tmpSemestre.matieres.concat(module.matieres)
      });
      return tmpSemestre
    });
  }
}

// actions
const actions = {
  fetch({ commit }, selectedPromotion) {
    APIMatieres.getByPromotions(selectedPromotion, matieres => {
      commit('SET_MATIERES', matieres)
    })
  }
}

// mutations
const mutations = {
  SET_MATIERES(state, matieres) {
    state.matieres = matieres
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}