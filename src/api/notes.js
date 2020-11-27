/**
 * Mocking client-server processing
 */
const data_notes = [
    {
      id: 1,
      name: "S6",
      UE: [{
        id: 1,
        name: "UE 1",
        matieres: [{
          id: 1,
          name: "math",
          note: 12,
          coeff: 0.5
        }, {
          id: 2,
          name: "physique",
          note: 12,
          coeff: 1
        }]
      }]
    },
  {
    id: 2,
    name: "S7",
    UE: [{
      id: 1,
      name: "UE 1",
      matieres: [{
        id: 1,
        name: "math",
        note: 12,
        coeff: 0.5
      }, {
        id: 2,
        name: "physique",
        note: 12,
        coeff: 1
      }]
    },
      {
        id: 2,
        name: "UE 2",
        matieres: [{
          id: 1,
          name: "math",
          note: 12,
          coeff: 0.5
        }, {
          id: 2,
          name: "physique",
          note: 12,
          coeff: 1
        }]
      }]
  },
  {
    id: 3,
    name: "S8",
    UE: [{
      id: 1,
      name: "UE 1",
      matieres: [{
        id: 1,
        name: "math",
        note: 12,
        coeff: 0.5
      }, {
        id: 2,
        name: "physique",
        note: 12,
        coeff: 1
      }]
    }]
  }
]

export default {
  getData_Notes(cb) {
    setTimeout(() => cb(data_notes), 100)
  },
}