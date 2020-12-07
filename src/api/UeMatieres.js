/**
 * Mocking client-server processing
 */
const dataMatiere = [
  {
    id : 1,
    nom : "Maths",
    module : "INFRES DIM",
    coefficient : 2,
    intervenant : "M.Machin"
  },
  {
    id : 2,
    nom : "DPPA",
    module : "INFRES MACHIN",
    coefficient : 1,
    intervenant : "M.Truc"
  },
  {
    id : 3,
    nom : "Anglais",
    module : "INFRES MACHIN",
    coefficient : 3,
    intervenant : "Erika Sensei"
  },
  {
    id : 4,
    nom : "PHP",
    module : "INFRES CHOSE",
    coefficient : 2,
    intervenant : "M.Truc"
  }
]

export default {
  getDataMatiere(cb) {
    setTimeout(() => cb(dataMatiere), 100)
  },
}