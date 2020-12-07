import promotion from '../../../api/admin/promotion'

// initial state
const state = () => ({
    data_promotions: []
})

// getters
const getters = {
    getElevesByPromotionForDisplaying: state => {
        let eleves = []
        state.data_promotions.forEach(promotion => {
            promotion.eleve.forEach(eleve => {
                eleves.push({
                    eleve_lastname: eleve.lastname,
                    eleve_firstname: eleve.firstname,
                    promotion: promotion.name
                })
            })
        })
        return eleves
    },
    getPromotions: state => {
        let promotions_list = []
        state.data_promotions.forEach(promotion => {
            promotions_list.push(promotion.name)
        })
        return promotions_list
    }
}

// actions
const actions = {
    getAllPromotions({ commit }) {
        promotion.getData_Promotion(promotions => {
            commit('setPromotions', promotions)
        })
    }
}

// mutations
const mutations = {
    setPromotions(state, promotions) {
        state.data_promotions = promotions
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}