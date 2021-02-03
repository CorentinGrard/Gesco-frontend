import UeMatieres from '../../api/UeMatieres'

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
        UeMatieres.getDataMatiere(matieres => {
            commit('setMatieres', matieres)
        })
    },
    getAllUe({ commit }) {
        UeMatieres.getDataUe(ue => {
            commit('setUe', ue)
        })
    }
}

// mutations
const mutations = {
    setMatieres(state, matieres) {
        state.dataMatiere = matieres
    },
    setUe(state, ue){
        state.dataUe = ue
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}