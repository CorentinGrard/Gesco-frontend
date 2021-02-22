/**
 * Mocking client-server processing
 */
import backend from '@/plugins/axios';

// let sessions = [
//   {
//     id: 1,
//     matiere: "maths",
//     type: "cours",
//     detail: "sur teams",
//     obligatoire: true,
//     dateDebut: new Date(Date.parse('2021-02-02T09:00:00')),
//     dateFin: new Date(Date.parse('2021-02-02T12:00:00')),
//   },
//   {
//     id: 2,
//     matiere: "IA",
//     type: "cours",
//     detail: "sur teams",
//     obligatoire: true,
//     dateDebut: new Date(Date.parse('2021-02-03T14:00:00')),
//     dateFin: new Date(Date.parse('2021-02-03T17:00:00')),
//   }
// ]

function sessionToEvent(session) {
  session.dateDebut = new Date(session.dateDebut)
  session.dateFin = new Date(session.dateFin)
  session.start = session.dateDebut
  session.end = session.dateFin
  session.timed = true;
  return session
}

export default {
  get(start, end, cb) {
    return backend.get(`/start/${start}/end/${end}/sessions`)
      .then((response) => {
        let sessions = response.data
        sessions = sessions.map(session => sessionToEvent(session))
        cb(sessions)
      })
      .catch((error) => Promise.reject(error))
  },
  getByIdPromotion(id, start, end, cb) {
    return backend.get(`/promotions/${id}/start/${start}/end/${end}/sessions`)
      .then((response) => {
        let sessions = response.data
        sessions = sessions.map(session => sessionToEvent(session))
        cb(sessions)
      })
      .catch((error) => Promise.reject(error))
  },
  add(id, session, cb) {
    backend.post(`/matieres/${id}/sessions`, session)
      .then((response) => {
        let session = sessionToEvent(response.data)
        cb(session)
      })
      .catch((error) => Promise.reject(error))
  },
  update(id, session){
    backend.put(`/sessions/${id}`, session)
      .catch((error) => Promise.reject(error))
  },
  delete(id){
    backend.delete(`/sessions/${id}`)
      .catch((error) => Promise.reject(error))
  },
}