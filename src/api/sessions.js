/**
 * Mocking client-server processing
 */
const sessions = [
  {
    id: 1,
    matiere: "maths",
    type: "cours",
    obligatoire: true,
    dateDebut: new Date(Date.parse('2020-11-18T09:00:00')),
    dateFin: new Date(Date.parse('2020-11-18T12:00:00')),
  },
  {
    id: 2,
    matiere: "IA",
    type: "cours",
    obligatoire: true,
    dateDebut: new Date(Date.parse('2020-11-18T14:00:00')),
    dateFin: new Date(Date.parse('2020-11-18T17:00:00')),
  }
]

export default {
  getSessions(cb) {
    setTimeout(() => cb(sessions), 100)
  },
}