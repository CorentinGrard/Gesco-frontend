import semestresAPI from '../../api/semestres'

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
    getAllSemestres({ commit }) {
        semestresAPI.getSemestres(semestres => {
            commit('setSemestres', semestres)
        })
    },
    fetchSemestres({ state, commit }) {
        if (state.semestres.length === 0) {
          APISemestres.getSemestres(semestres => {
            commit('setSemestres', semestres)
          })
        }
      },
      setSelectedSemestre({ commit }, selectedSemestre) {
        commit('setSelectedSemestre', selectedSemestre)
      }
}

// mutations
const mutations = {
    setSemestres(state, semestres) {
        state.semestres = semestres
    },
    setSelectedSemestre(state, selectedSemestre) {
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