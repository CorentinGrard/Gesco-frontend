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
    addUe({ commit }, ue) {
            commit('addUe', ue)
    },
    editUe({ commit }, ue) {
            commit('editUe', ue)
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
    addUe(state, ue){
        state.dataUe.push(ue)
    },
    editUe(state,ue){
        Object.assign(state.dataUe.find(Uee => Uee.id = ue.id),ue)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}