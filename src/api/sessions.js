// import axios from '../plugins/axios';

const sessions = [
  {
    id: 1,
    matiere: "maths",
    type: "cours",
    detail: "sur teams",
    obligatoire: true,
    dateDebut: new Date(Date.parse('2020-11-23T09:00:00')),
    dateFin: new Date(Date.parse('2020-11-23T12:00:00')),
  },
  {
    id: 2,
    matiere: "IA",
    type: "cours",
    detail: "sur teams",
    obligatoire: true,
    dateDebut: new Date(Date.parse('2020-11-23T14:00:00')),
    dateFin: new Date(Date.parse('2020-11-23T17:00:00')),
  }
]

export default {
  getSessions (cb) {
    setTimeout(() => cb(sessions), 100)
    // return axios.backend.get("/sessions")
    //   .then((response) => cb(response.data))
    //   .catch((error) => Promise.reject(error))
  },
}