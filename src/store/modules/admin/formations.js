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
                id: formation.id,
                name: formation.name,
                responsable: formation.responsable.prenom + ' ' + formation.responsable.nom
            })
        })
        return formations_list
    }
}

// actions
const actions = {
    initFormations({ commit }) {
        formation.getData_Formation(formations => {
            commit('initFormations', formations)
        })
    },
    addFormation({ commit }, formation) {
        commit('addFormation', formation)
    },
    removeFormation({ commit }, index) {
        commit('removeFormation', index)
    },
    editFormation({ commit }, {editedIndex, editedItem}) {
        commit('editFormation', {editedIndex, editedItem})
    }

}

// mutations
const mutations = {
    initFormations(state, formations) {
        state.data_formations = formations
    },
    addFormation(state, formation) {
        state.data_formations.push(formation)
    },
    removeFormation(state, index) {
        state.data_formations.splice(index, 1)
    },
    editFormation(state, {editedIndex, editedItem}){
        Object.assign(state.data_formations[editedIndex], editedItem)
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
