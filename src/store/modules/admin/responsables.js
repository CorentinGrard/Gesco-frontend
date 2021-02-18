import formation from '../../../api/admin/responsable'

// initial state
const state = () => ({
    data_responsables: []
})

// getters
const getters = {
    getResponsables: state => {
        let responsables_list = []
        state.data_responsables.forEach(responsable => {
            responsables_list.push({
                id: responsable.id,
                nom: responsable.nom,
                prenom: responsable.prenom
            })
        })
        return responsables_list
    }
}

// actions
const actions = {
    initResponsables({ commit }) {
        formation.getData_Responsable(responsables => {
            commit('initResponsables', responsables)
        })
    }
}

// mutations
const mutations = {
    initResponsables(state, responsables) {
        state.data_responsables = responsables
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}