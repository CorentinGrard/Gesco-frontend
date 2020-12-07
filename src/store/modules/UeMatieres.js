import UeMatieres from '../../api/UeMatieres'

// initial state
const state = () => ({
    dataMatiere: []
})

// getters
const getters = {
    getMatieresForDisplaying: state => {
        return state.dataMatiere
    },
}

// actions
const actions = {
    getAllMatieres({ commit }) {
        UeMatieres.getDataMatiere(matieres => {
            commit('setMatieres', matieres)
        })
    }
}

// mutations
const mutations = {
    setMatieres(state, matieres) {
        state.dataMatiere = matieres
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}