import semestresAPI from '../../api/semestres'

// initial state
const state = () => ({
    semestres: []
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
    }
}

// mutations
const mutations = {
    setSemestres(state, semestres) {
        state.semestres = semestres
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}