import ApiUeMatieres from '@/api/UeMatieres'
import ApiMatieres from '@/api/matieres'

// initial state
const state = () => ({
    dataMatiere: [],
    dataUe: []
})

// getters
const getters = {
    getMatieresForDisplaying: state => {
        return state.dataMatiere
    },
    getUeForDisplaying: state => {
        return state.dataUe
    },
    getUeAsNameList: state => {
        let nameList = []
        state.dataUe.forEach(ue => { nameList.push(ue.name) })
        return nameList
    }
}

// actions
const actions = {
    /*getAllMatieres({ commit }) {
        ApiUeMatieres.getDataMatiere(matieres => {
            commit('setMatieres', matieres)
        })
    },*/
    getMatiereByPromotion({commit},selectedPromotion){
        ApiMatieres.getByPromotions(selectedPromotion, matieres => {
            commit('setMatieres', matieres)
          })
    },
    getAllUe({ commit }) {
        ApiUeMatieres.getDataUe(ue => {
            commit('setUe', ue)
        })
    },
    addMatiere({ commit }, matiere) {
        console.log(matiere)
        let matiereApiFormat =
        {
            "nom": matiere.nom,
            "coefficient": matiere.coefficient,
            "nombreHeuresAPlacer": matiere.nombreHeuresAPlacer,
        }
        ApiMatieres.postMatiere(
            matiere.module.id,
            matiereApiFormat,
            matiere_response => {
                let newMatiere = {
                    nom : matiere_response.nom,
                    module : {id : matiere_response.moduleId, name: matiere_response.moduleName},
                    coefficient : matiere_response.coefficient,
                    nombreHeuresAPlacer : matiere_response.nombreHeuresAPlacer,
                    intervenant : "M.Robot"
                }
                commit("addMatiere", newMatiere)
            }
        )
    },

    editMatiere({ commit }, {matiereIndex, matiere}) {
            commit('editMatiere', {matiereIndex, matiere})
    },
    deleteMatiere({ commit }, matiere) {
        commit('deleteMatiere', matiere)
    },
    addUe({ commit }, ue) {
            commit('addUe', ue)
    },
    editUe({ commit },{ueIndex, ue}) {
            commit('editUe', { ueIndex, ue})
    },
    deleteUe({ commit }, ue) {
        commit('deleteUe', ue)
    }
}

// mutations
const mutations = {
    setMatieres(state, semestres) {
        let finalMatieres = [];
        semestres.forEach(function(item) {
            let modules = item.modules
            modules.forEach(function(item){
                let moduleId = item.idModule
                let moduleName = item.nomModule
                let matieres = item.matieres
                matieres.forEach(function(item){
                    finalMatieres.push({
                        id : item.idMatiere,
                        nom : item.nomMatiere,
                        module : {id : moduleId, name: moduleName},
                        coefficient : item.coefficient,
                        nombreHeuresAPlacer : item.nombreHeuresAPlacer,
                        intervenant : "M.Robot"
                      },
                )
                })
            })
          });   
        state.dataMatiere = finalMatieres
        
    },
    setUe(state, ue){
        state.dataUe = ue
    },
    addMatiere(state, matiere){
        state.dataMatiere.push(matiere)
    },
    editMatiere(state,{matiereIndex,matiere}){
        Object.assign(state.dataMatiere[matiereIndex],matiere)
    },
    deleteMatiere(state,matiereIndex){
        state.dataMatiere.splice(matiereIndex,1)
    },
    addUe(state, ue){
        state.dataUe.push(ue)
    },
    editUe(state,{ueIndex,ue}){
        Object.assign(state.dataUe[ueIndex],ue)
    },
    deleteUe(state,ueIndex){
        state.dataUe.splice(ueIndex,1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}