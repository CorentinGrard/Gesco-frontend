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
      // newSession.name = session.matiere.nom;
      newSession.start = session.dateDebut;
      newSession.end = session.dateFin;
      newSession.timed = true;
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
    APIsessions.getSessionsByIdPromotion(id, start, end, (sessions) => {
      sessions.forEach(session => {
        session.dateDebut = new Date(session.dateDebut)
        session.dateFin = new Date(session.dateFin)
        session.detail = "TODO"
      });
      commit("ADD_SESSIONS", sessions);
    });
  },
  fetchSessions({ commit }, month) {
    APIsessions.getSessions(month, (sessions) => {
      sessions.forEach(session => {
        session.dateDebut = new Date(session.dateDebut)
        session.dateFin = new Date(session.dateFin)
        session.detail = "TODO"
      });
      commit("setSessions", sessions);
    });
  },

  clearSessions({ commit }) {
    commit("CLEAR_SESSIONS")
  },

  updateSessionBySelectedSession({ commit }) {
    commit("updateSessionBySelectedSession");
    //TODO Appel api
  },
  deleteSessionBySelectedSession({ commit }) {
    commit("deleteSessionBySelectedSession");
  },
  addSession({ commit }, session) {
    // API save
    APIsessions.addSession(session, (session) => {
      commit("addSession", session)
    })
  },
  updateSessionByEvent({ commit }, event) {
    commit("updateSessionByEvent", event)
  },
  deleteSession({ commit }, session) {
    commit("deleteSession", session)
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
  setSessions(state, sessions) {
    state.sessions = sessions;
  },
  deleteSessionBySelectedSession(state) {
    let indexSession = state.sessions.findIndex((sessionT) => sessionT.id === state.selectedSession.id)
    state.sessions.splice(indexSession, 1)
    //TODO API Call
  },
  updateSessionBySelectedSession(state) {
    const session = state.sessions.find((sessionT) => sessionT.id === state.selectedSession.id)
    session.id = state.selectedSession.id;
    session.matiere = state.selectedSession.matiere;
    session.detail = state.selectedSession.detail;
    session.type = state.selectedSession.type;
    session.obligatoire = state.selectedSession.obligatoire;
    session.dateDebut = state.selectedSession.dateDebut;
    session.dateFin = state.selectedSession.dateFin;
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
  addSession(state, session) {
    state.sessions.push(session)
  },
  deleteSession(state, session) {
    const i = state.sessions.indexOf(session);
    if (i !== -1) {
      state.sessions.splice(i, 1);
    }
  },
  updateSessionByEvent(state, event) {
    const session = state.sessions.find((session) => session.id === event.id);
    session.matiere = event.matiere;
    session.detail = event.detail;
    session.type = event.type;
    session.obligatoire = event.obligatoire;
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
