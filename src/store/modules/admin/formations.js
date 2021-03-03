import formationAPI from '../../../api/admin/formation'

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
                name: formation.nom,
                isAlternance: formation.isAlternance,
                responsable: formation.responsable.Personne.prenom + ' ' + formation.responsable.Personne.nom
            })
        })
        return formations_list
    }
}

// actions
const actions = {
    initFormations({ commit }) {
        formationAPI.getData_Formation(formations => {
            commit('initFormations', formations)
        })
    },
    addFormation({ commit }, formation) {
        formation['nameFormation'] = formation['name'];
        delete formation['name'];
        formation.idResponsable = formation.responsable.id;
        delete formation['responsable'];
        formation.isAlternant = true;
        formationAPI.post_Formation(formation, formation => {
            commit('addFormation', formation)
        })
    },
    editFormation({ commit }, {editedIndex, editedItem}) {
        formationAPI.put_Formation(editedItem.id, editedItem, semestre => {
            commit('editFormation', {editedIndex, semestre})
        })
    }
    /*
    removeFormation({ commit }, index) {
        commit('removeFormation', index)
    },
    removeEleve({ commit }, {editedIndex, editedItem}) {
        APIeleves.delete_Eleve(
            editedItem.eleve_id
        )
        commit('removeEleve', editedIndex)
    },

*/

}

// mutations
const mutations = {
    initFormations(state, formations) {
        state.data_formations = formations
    },
    addFormation(state, formation) {
        state.data_formations.push(formation)
    },
    editFormation(state, {editedIndex, editedItem}){
        Object.assign(state.data_formations[editedIndex], editedItem)
    },
    removeFormation(state, index) {
        state.data_formations.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
