/**
 * Mocking client-server processing
 */
const axios = require('axios');
const endpoint = "http://127.0.0.1:8000"
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
    return axios.get(endpoint + "/sessions")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
}