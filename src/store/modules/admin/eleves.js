import APIeleves from '../../../api/admin/eleves'

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
        APIeleves.getData_Eleves(eleves => {
            commit('initEleves', eleves)
        })
    },
    addEleve({ commit }, eleve) {
        let eleveAPIformat =
        {
            "prenom": eleve.eleve_firstname,
            "nom": eleve.eleve_lastname,
            "adresse": eleve.adresse,
            "numeroTel": eleve.numeroTel
        }
        APIeleves.post_Eleve(
            eleve.promotion_id,
            eleveAPIformat,
            eleve_response => {
                commit("addEleve", {eleve, eleve_response})
            }
        )
    },
    removeEleve({ commit }, {editedIndex, editedItem}) {
        APIeleves.delete_Eleve(
            editedItem.eleve_id
        )
        commit('removeEleve', editedIndex)
    },
    editEleve({ commit }, {editedIndex, editedItem}) {
        let eleveAPIformat =
            {
                "prenom": editedItem.eleve_firstname,
                "nom": editedItem.eleve_lastname,
                "adresse": editedItem.adresse,
                "numeroTel": editedItem.numeroTel,
                "promotion_id": editedItem.promotion_id
            }
        APIeleves.put_Eleve(
            editedItem.eleve_id,
            eleveAPIformat,
        )
        commit('editEleve', {editedIndex, editedItem})
    }
}

// mutations
const mutations = {
    initEleves(state, eleves) {
        state.data_eleves = []
        eleves.forEach(promotion => {
            promotion.Etudiants.forEach(eleve => {
                state.data_eleves.push({
                    eleve_id: eleve.id,
                    eleve_lastname: eleve.Personne.nom,
                    eleve_firstname: eleve.Personne.prenom,
                    email: eleve.Personne.email,
                    numeroTel: eleve.Personne.numeroTel,
                    adresse: eleve.Personne.adresse,
                    promotion: promotion.nomPromotion,
                    promotion_id: promotion.id
                })
            })
        })
    },
    addEleve(state, {eleve, eleve_response}) {
        let new_eleve = {
            eleve_id: eleve_response.id,
            eleve_lastname: eleve_response.Personne.nom,
            eleve_firstname: eleve_response.Personne.prenom,
            email: eleve_response.Personne.email,
            numeroTel: eleve_response.Personne.numeroTel,
            adresse: eleve_response.Personne.adresse,
            promotion: eleve.promotion,
            promotion_id: eleve.promotion_id
        }
        state.data_eleves.push(new_eleve)
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