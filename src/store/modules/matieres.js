import matieresAPI from '../../api/matieres'

// initial state
const state = () => ({
    matieres: []
})

// getters
const getters = {

}

// actions
const actions = {
    getAllMatieres({ commit }) {
        matieresAPI.getMatieres(matieres => {
            commit('setMatieres', matieres)
        })
    }
}

// mutations
const mutations = {
    setMatieres(state, matieres) {
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