import sessions from '../../api/sessions'

// initial state
const state = () => ({
    sessions: []
})

// getters
const getters = {
    getSessionForPlanning: state => {
        return state.sessions.map(session => {
            session.name = session.matiere
            session.start = session.dateDebut
            session.end = session.dateFin
            session.timed = true
            console.log(typeof(session.start))
            return session
        })
    }
}

// actions
const actions = {
    getAllSessions({ commit }) {
        sessions.getSessions(sessions => {
            commit('setSessions', sessions)
        })
    }
}

// mutations
const mutations = {
    setSessions(state, sessions) {
        state.sessions = sessions
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}