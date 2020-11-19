import promotionsAPI from '../../api/promotions'

// initial state
const state = () => ({
    promotions: []
})

// getters
const getters = {

}

// actions
const actions = {
    getAllPromotions({ commit }) {
        promotionsAPI.getPromotions(promotions => {
            commit('setPromotions', promotions)
        })
    }
}

// mutations
const mutations = {
    setPromotions(state, promotions) {
        state.promotions = promotions
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}