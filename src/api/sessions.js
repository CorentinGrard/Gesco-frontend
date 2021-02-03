// import axios from '../plugins/axios';

let sessions = [
  {
    id: 1,
    matiere: "maths",
    type: "cours",
    detail: "sur teams",
    obligatoire: true,
    dateDebut: new Date(Date.parse('2021-02-02T09:00:00')),
    dateFin: new Date(Date.parse('2021-02-02T12:00:00')),
  },
  {
    id: 2,
    matiere: "IA",
    type: "cours",
    detail: "sur teams",
    obligatoire: true,
    dateDebut: new Date(Date.parse('2021-02-03T14:00:00')),
    dateFin: new Date(Date.parse('2021-02-03T17:00:00')),
  }
]

export default {
  getSessions(cb) {
    setTimeout(() => {
      const copiedSessions = [...sessions];
      cb(copiedSessions)
    }, 100)
    // return axios.backend.get("/sessions")
    //   .then((response) => cb(response.data))
    //   .catch((error) => Promise.reject(error))
  },
  addSession(session, cb) {
    setTimeout(() => {
      session.id = Math.floor(Math.random() * Math.floor(100000));
      if (session.matiereId == 1) {
        session.matiere = "Maths"
      } else if (session.matiereId == 2) {
        session.matiere = "IA"
      } else if (session.matiereId == 3) {
        session.matiere = "Projet"
      }

      sessions.push(session)
      cb(session)
    }, 100)
  }
}