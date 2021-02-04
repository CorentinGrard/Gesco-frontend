import ApiUeMatieres from '../../api/UeMatieres'

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
    getAllMatieres({ commit }) {
        ApiUeMatieres.getDataMatiere(matieres => {
            commit('setMatieres', matieres)
        })
    },
    getAllUe({ commit }) {
        ApiUeMatieres.getDataUe(ue => {
            commit('setUe', ue)
        })
    },
    addMatiere({ commit }, matiere) {
            commit('addMatiere', matiere)
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
    setMatieres(state, matieres) {
        state.dataMatiere = matieres
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