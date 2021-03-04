import APIMatieres from '@/api/matieres'

// initial state
const state = () => ({
  matieres: [],
  matieresAjoutNote: [],
  selectedMatiere: null
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
    })
  },
}

// actions
const actions = {
  fetchByPromotion({ commit }, selectedPromotion) {
    APIMatieres.getByPromotions(selectedPromotion, matieres => {
      commit('SET_MATIERES', matieres)
    })
  },
  fetchBySemestre({ commit }, selectedSemestre) {
    APIMatieres.getBySemestre(selectedSemestre, matieres => {
      commit('SET_MATIERES_AJOUT_NOTES', matieres)
    })
  },
  setSelectedMatiere({ commit }, matiere) {
    commit("SET_SELECTED_MATIERE", matiere)
  }
}

// mutations
const mutations = {
  SET_MATIERES(state, matieres) {
    state.matieres = matieres
  },
  SET_SELECTED_MATIERE(state, matiere) {
    state.selectedMatiere = matiere
  },
  SET_MATIERES_AJOUT_NOTES(state, matieres) {
    state.matieresAjoutNote = matieres
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}