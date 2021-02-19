import backend from "../plugins/axios";

/**
 * Mocking client-server processing
 */
// const matieres = [
//   {
//     id: 1,
//     name: "S1",
//     matieres: [
//       {
//         id: 1,
//         name: "Maths",
//         nombreHeuresTotal: 150,
//         nombreHeuresPlace: 150,
//       },
//       {
//         id: 2,
//         name: "IA",
//         nombreHeuresTotal: 30,
//         nombreHeuresPlace: 10,
//       },
//       {
//         id: 3,
//         name: "Projet",
//         nombreHeuresTotal: 40,
//         nombreHeuresPlace: 0,
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "S2",
//     matieres: [
//       {
//         id: 4,
//         name: "Maths",
//         nombreHeuresTotal: 10,
//         nombreHeuresPlace: 0,
//       },
//       {
//         id: 5,
//         name: "Informatique",
//         nombreHeuresTotal: 60,
//         nombreHeuresPlace: 10,
//       },
//       {
//         id: 6,
//         name: "Big Data",
//         nombreHeuresTotal: 12,
//         nombreHeuresPlace: 5,
//       },
//     ],
//   },
// ]

export default {
  getByPromotions(promotion, cb) {
    backend
      .get(`/promotions/${promotion}/matieres`)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
  postMatiere(idModule, matiere, cb) {
    backend
      .post("/modules/" + idModule + "/matieres", JSON.stringify(matiere))
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
  deleteMatiere(idMatiere, cb) {
    backend
      .delete("/matieres/" + idMatiere)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
  putMatiere(idMatiere,matiere, cb) {
    backend
      .put("/matiere/" + idMatiere,JSON.stringify(matiere))
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
};
