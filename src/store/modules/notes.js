import notes from '../../api/notes'

// initial state
const state = () => ({
    data_notes: []
})

// getters
const getters = {
    getNotesForDisplaying: state => {
        let notes = []
        state.data_notes.forEach(semester => {
            semester.UE.forEach(UE => {
                UE.matieres.forEach(matiere => {
                    notes.push({
                        note: matiere.note,
                        matiere: matiere.name,
                        semester: semester.name,
                        category: UE.name,
                        coeff: matiere.coeff
                    })
                })
            })
        })
        return notes
    },
    getSemesters: state => {
        let semesters = []
        state.data_notes.forEach(semester => {
            semesters.push(semester.name)
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
        state.data_notes = notes
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}