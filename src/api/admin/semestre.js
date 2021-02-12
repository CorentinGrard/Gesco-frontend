/**
 * Mocking client-server processing
 */

const semestres = [
  {
    id: 1,
    nom: "S1",
  },
  {
    id: 2,
    nom: "S2",
  },
  {
    id: 3,
    nom: "S3",
  }
]

export default {
  getSemestresByPromotion(id, cb) {
    setTimeout(() => cb(semestres), 100)
  },
}