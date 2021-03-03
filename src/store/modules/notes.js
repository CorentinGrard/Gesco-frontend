import notes from '@/api/notes'

// initial state
const state = () => ({
    data_notes: []
})

// getters
const getters = {
    getNotesForDisplaying: state => {
        let notes = []
        state.data_notes.forEach(note => {
            notes.push({
                note: note.note,
                matiere: note.Matiere.nom,
                semester: note.Matiere.module.semestre.nom,
                category: note.Matiere.module.nom,
                coeff: note.Matiere.coefficient
            })
        })
        console.log(notes)
        return notes
    },
    getSemesters: state => {
        let semesters = []
        state.data_notes.forEach(note => {
            semesters.push(note.Matiere.module.semestre.nom)
        })
        return semesters
    }
}

// actions
const actions = {
    getAllNotes({ commit }) {
        notes.getData_Notes(notes => {
            commit('setNotes', notes)
        })
    }
}

// mutations
const mutations = {
    setNotes(state, notes) {
        state.data_notes = notes.Notes
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}