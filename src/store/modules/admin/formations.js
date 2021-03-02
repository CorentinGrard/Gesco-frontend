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
        formationAPI.get_Formations(formations => {
            commit('initLocalFormations', formations)
        })
    },
    addFormation({ commit }, formation) {
        formation['nom'] = formation['name'];
        delete formation['name'];
        formation.idResponsable = formation.responsable.id;
        delete formation['responsable'];
        formation.isAlternance = true;
        console.log("add formation");
        console.log(formation);
        formationAPI.add_Formation(formation, formation => {
            commit('addLocalFormation', formation)
        })
    },
    editFormation({ commit }, formation) {
        let id = formation.id;
        delete formation['id'];
        formation['nom'] = formation['name'];
        delete formation['name'];
        formation.idResponsable = formation.responsable.id;
        //delete formation['responsable'];
        console.log("edit formation");
        console.log(formation);
        formationAPI.update_Formation(id, formation, formation => {
            commit('updateLocalFormation', formation)
        })
    },
    removeFormation({ commit }, {id, index}) {
        formationAPI.delete_Formation(id)
        commit('removeLocalFormation', index)
    }

}

// mutations
const mutations = {
    initLocalFormations(state, formations) {
        state.data_formations = formations
    },
    addLocalFormation(state, formation) {
        state.data_formations.push(formation)
    },
    updateLocalFormation(state, editedItem){
        console.log("updateLocalFormation");
        console.log(editedItem);
        Object.assign(state.data_formations.find(formation => formation.id === editedItem.id), editedItem)
    },
    removeLocalFormation(state, index) {
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
