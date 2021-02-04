import eleves from '../../../api/admin/eleves'

// initial state
const state = () => ({
    data_eleves: []
})

// getters
const getters = {
    getElevesByPromotionForDisplaying: state => {
        return state.data_eleves
    }
}

// actions
const actions = {
    initEleves({ commit }) {
        eleves.getData_Eleves(eleves => {
            commit('initEleves', eleves)
        })
    },
    addEleve({ commit }, eleve) {
        commit('addEleve', eleve)
    },
    removeEleve({ commit }, index) {
        commit('removeEleve', index)
    },
    editEleve({ commit }, {editedIndex, editedItem}) {
        commit('editEleve', {editedIndex, editedItem})
    }
}

// mutations
const mutations = {
    initEleves(state, eleves) {
        state.data_eleves = []
        eleves.forEach(promotion => {
            promotion.eleve.forEach(eleve => {
                state.data_eleves.push({
                    eleve_id: eleve.id,
                    eleve_lastname: eleve.lastname,
                    eleve_firstname: eleve.firstname,
                    promotion: promotion.name,
                    promotion_id: promotion.id
                })
            })
        })
    },
    addEleve(state, eleve) {
        state.data_eleves.push(eleve)
    },
    removeEleve(state, index) {
        state.data_eleves.splice(index, 1)
    },
    editEleve(state, {editedIndex, editedItem}){
        Object.assign(state.data_eleves[editedIndex], editedItem)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}