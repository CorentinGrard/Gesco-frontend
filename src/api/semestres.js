/**
 * Mocking client-server processing
 */
const semestres = [
  {
    id: 1,
    name: "S5"
  },
  {
    id: 2,
    name: "S6"
  },
  {
    id: 3,
    name: "S7"
  },
  {
    id: 4,
    name: "S8"
  },
  {
    id: 5,
    name: "S9"
  },
  {
    id: 6,
    name: "S10"
  },
]

export default {
  getSemestres(cb) {
    setTimeout(() => cb(semestres), 100)
  },
}