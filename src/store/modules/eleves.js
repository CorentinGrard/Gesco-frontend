import elevesAPI from '../../api/eleves'

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
            commit('setEleves', eleves)
        })
    }
}

// mutations
const mutations = {
    setEleves(state, eleves) {
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