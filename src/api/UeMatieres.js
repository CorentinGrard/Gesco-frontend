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

const dataUe = [
  {
    id : 1,
    nom : "INFRES DIM",
    semestre : "S",
    ects : 2
  },
  {
    id : 2,
    nom : "INFRES MACHIN",
    semestre : "S2",
    ects : 4
  },
  {
    id : 3,
    nom : "INFRES TRUC",
    semestre : "S3",
    ects : 2
  },
  {
    id : 4,
    nom : "INFRES DIMM",
    semestre : "S4",
    ects : 2
  }
]


export default {
  getDataMatiere(cb) {
    setTimeout(() => cb(dataMatiere), 100)
  },
  getDataUe(cb){
    setTimeout(() => cb(dataUe), 100)
  }
}