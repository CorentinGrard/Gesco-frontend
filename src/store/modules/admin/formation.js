import formation from '../../../api/admin/formation'

// initial state
const state = () => ({
    data_formations: []
})

// getters
const getters = {
    getFormations: state => {
        let formations_list = []
        state.data_formations.forEach(formation => {
            formations_list.push({
                formation_name: formation.name,
                formation_responsable: formation.responsable
            })
        })
        return formations_list
    }
}

// actions
const actions = {
    getAllFormations({ commit }) {
        formation.getData_Formation(formations => {
            commit('setFormations', formations)
        })
    }
}

// mutations
const mutations = {
    setFormations(state, formations) {
        state.data_formations = formations
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
