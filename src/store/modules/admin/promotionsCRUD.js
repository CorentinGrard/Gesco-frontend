import promotion from '../../../api/admin/promotionsCRUD'

// initial state
const state = () => ({
    data_promotions: []
})

// getters
const getters = {

    getPromotionsByFormationForDisplaying: state => {
        return state.data_promotions
    },

    getPromotions: state => {
        let promotions_list = []
        state.data_promotions.forEach(promotion => {
            promotions_list.push({
                id: promotion.id,
                name: promotion.name
            })
        })
        return promotions_list
    },

    getFormations: state => {
        let formation_list = []
        state.data_promotions.forEach(promotion => {
            formation_list.push(promotion.formation)
        })
        return formation_list
    }
}

// actions
const actions = {
    initPromotions({ commit }) {
        promotion.getData_Promotion(promotions => {
            commit('initPromotions', promotions)
        })
    },
    addPromotion({ commit }, promotion) {
        commit('addPromotion', promotion)
    },
    removePromotion({ commit }, index) {
        commit('removePromotion', index)
    },
    editPromotion({ commit }, {editedIndex, editedItem}) {
        commit('editPromotion', {editedIndex, editedItem})
    }
}

// mutations
const mutations = {
    initPromotions(state, promotions) {
        state.data_promotions = promotions
    },
    addPromotion(state, promotion) {
        state.data_promotions.push(promotion)
    },
    removePromotion(state, index) {
        state.data_promotions.splice(index, 1)
    },
    editPromotion(state, {editedIndex, editedItem}){
        Object.assign(state.data_promotions[editedIndex], editedItem)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}