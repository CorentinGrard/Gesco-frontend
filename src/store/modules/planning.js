import APIsessions from "@/api/sessions";

// initial state
const state = () => ({
  sessions: [],
  selectedSession: { matiere: {} },
});

// getters
const getters = {
  getEventsForPlanning: (state) => {
    return state.sessions.map((session) => {
      let newSession = JSON.parse(JSON.stringify(session))
      newSession.dateDebut = new Date(newSession.dateDebut)
      newSession.dateFin = new Date(newSession.dateFin)
      newSession.start = new Date(newSession.start).getTime()
      newSession.end = new Date(newSession.end).getTime()
      return newSession;
    });
  },
  getSessionById: (state) => (id) => {
    let temp = state.sessions.find((session) => session.id === id);
    return temp;
  },
};

// actions
const actions = {
  fetchSessionsByIdPromotion({ commit }, { id, start, end }) {
    APIsessions.getByIdPromotion(id, start, end, (sessions) => {
      commit("ADD_SESSIONS", sessions);
    });
  },
  fetchSessions({ commit }, { start, end }) {
    APIsessions.get(start, end, (sessions) => {
      commit("ADD_SESSIONS", sessions);
    });
  },
  clearSessions({ commit }) {
    commit("CLEAR_SESSIONS")
  },
  addSession({ commit }, session) {
    APIsessions.add(session.matiere, session, (session) => {
      commit("ADD_SESSIONS", [session])
    })
  },
  updateSessionBySelectedSession({ commit, state }) {
    let session = state.selectedSession
    session.idMatiere = session.matiere.id
    APIsessions.update(session.id, session)
    commit("UPDATE_SESSION", session)
  },
  updateTimeSession({ commit }, session) {
    session.idMatiere = session.matiere.id
    APIsessions.update(session.id, session)
    commit("UPDATE_SESSION", session)
  },
  deleteSession({ commit }, session) {
    APIsessions.delete(session.id)
    commit("DELETE_SESSION", session)
  },
  deleteSessionBySelectedSession({ commit, state }) {
    let session = state.selectedSession
    APIsessions.delete(session.id)
    commit("DELETE_SESSION", session);
  },
};

// mutations
const mutations = {
  ADD_SESSIONS(state, sessions) {
    sessions.forEach(session => {
      const sessionAlreadyExist = state.sessions.some(stateSession => stateSession.id == session.id)
      if (!sessionAlreadyExist) {
        state.sessions.push(session)
      }
    })
  },
  CLEAR_SESSIONS(state) {
    state.sessions = []
  },
  updateSelectedSessionMatiere(state, matiere) {
    state.selectedSession.matiere = matiere;
  },
  updateSelectedSessionType(state, type) {
    state.selectedSession.type = type;
  },
  updateSelectedSessionObligatoire(state, obligatoire) {
    state.selectedSession.obligatoire = obligatoire;
  },
  updateSelectedSessionDetail(state, detail) {
    state.selectedSession.detail = detail;
  },
  updateSelectedSessionDateFin(state, dateFin) {
    state.selectedSession.dateFin = dateFin;
  },
  updateSelectedSessionDateDebut(state, dateDebut) {
    state.selectedSession.dateDebut = dateDebut;
  },
  setSelectedSession(state, session) {
    let temp = JSON.stringify(session);
    let newObj = JSON.parse(temp, function (key, value) {
      if (key === "dateFin" || key === "dateDebut") {
        return new Date(value);
      } else {
        return value;
      }
    });
    state.selectedSession = newObj;
  },
  DELETE_SESSION(state, session) {
    const i = state.sessions.findIndex(mySession => mySession.id === session.id);
    if (i !== -1) {
      state.sessions.splice(i, 1);
    }
  },
  UPDATE_SESSION(state, event) {
    const session = state.sessions.find((session) => session.id === event.id);
    session.matiere = event.matiere;
    session.detail = event.detail;
    session.type = event.type;
    session.obligatoire = event.obligatoire;
    session.start = event.start;
    session.end = event.end;
    session.dateDebut = new Date(event.start);
    session.dateFin = new Date(event.end);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
