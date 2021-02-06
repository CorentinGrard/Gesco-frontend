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

export default {
  getSessions(cb) {
    return backend.get("/sessions")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
  addSession(session, cb) {
    console.log(session)
    axios.backend.post("/sessions",session)
      .then((response) => {
        console.log(response)
        cb(response.data)
      })
      .catch((error) => Promise.reject(error))
  }
}